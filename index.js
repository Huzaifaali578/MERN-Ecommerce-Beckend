import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { connectUsingMongoose } from "./config.js";
import productRouter from "./Router/Product.js";
import brandRouter from "./Router/Brand.js";
import categoryRouter from "./Router/Category.js";
import cors from "cors";
import UserRouter from "./Router/User.js";
import authRouter from "./Router/Auth.js";
import cartRouter from "./Router/Cart.js";
import orderRouter from "./Router/Order.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { UserModel } from "./Model/User.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { cookieExtractor, isAuth, sanitizeUser } from "./services/commen.js";
import { Strategy as JwtStrategy } from "passport-jwt";
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import path from "path";
import { fileURLToPath } from "url";
import MongoStore from "connect-mongo";

// Emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// create server
const server = express();

// JWT options 
const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

// Middleware
server.use(express.static(path.resolve(__dirname, 'build')));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
    cors({
        // origin: "https://mern-ecommerce-beckend-dxqncng24-huzaifa-nagariyas-projects.vercel.app/",
        // origin: "https://mern-ecommerce-frontend-blue.vercel.app",
        origin: true,
        credentials: true,
        exposedHeaders: ["X-Total-Count"],
    })
);
// server.use(
//     session({
//         secret: process.env.SESSION_KEY,
//         resave: false,
//         saveUninitialized: false,
//     })
// );

server.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_DB_URL, // Replace with your MongoDB connection string
            collectionName: "sessions",
        }),
        cookie: {
            secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);


server.use(passport.authenticate('session'));
// server.use(passport.initialize());
// server.use(passport.session());

// Base route for health check
server.get("/", (req, res) => {
    res.json({ Status: "Success" });
});



// Mount routers
server.use("/api/products", isAuth(), productRouter);
server.use("/api/brand", isAuth(), brandRouter);
server.use("/api/category", isAuth(), categoryRouter);
server.use("/api/users", isAuth(), UserRouter);
server.use("/api/auth", authRouter);
server.use("/api/cart", isAuth(), cartRouter);
server.use("/api/orders", isAuth(), orderRouter);

// Catch-all route for React app
server.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
        return next(); // Skip React handling for API requests
    } else {  
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    }
});

// Passport Local Strategy
passport.use('local',
    new LocalStrategy({ usernameField: "email" },
        async function (email, password, done) {
            // console.log("Username:", email); // Debugging: log email
            // console.log("Password:", password); // Debugging: log password
            try {
                const user = await UserModel.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: "Invalid Credentials" });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: "Invalid Credentials" });
                }
                const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY);
                return done(null, { token }); // Return token as an object for clarity
            } catch (err) {
                return done(err);
            }
        }
    )
);
// Passport jwt strategy
passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log("jwt_payload", jwt_payload)
    try {
        const user = await UserModel.findById(jwt_payload.id); // Use correct key (e.g., `id`)
        if (user) {
            return done(null, sanitizeUser(user)); // Ensure `sanitizeUser` is defined
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));


passport.serializeUser((user, cb) => {
    // // console.log("serializeUser")
    process.nextTick(() => cb(null, { id: user.id, role: user.role }));
});

passport.deserializeUser((user, cb) => {
    // console.log("de-serializeUser")
    process.nextTick(() => cb(null, user));
});


// Global error handling middleware
server.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// payments

// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);




server.post("/create-payment-intent", async (req, res) => {
    try {
        const { totalAmount } = req.body;

        if (!totalAmount || totalAmount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        console.log("Environment:", process.env.NODE_ENV);
        console.log("Stripe Key Exists:", !!process.env.STRIPE_SECRET_KEY);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Convert to cents
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: "Failed to create payment intent" });
    }
});



// dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
// Start the server
server.listen(process.env.PORT, () => {
    console.log("Server is listening on port 8080");
    connectUsingMongoose();
});
