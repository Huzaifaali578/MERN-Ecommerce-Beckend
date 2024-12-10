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

const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}));
  


// Base route for health check
server.get("/", (req, res) => {
    res.json({ Status: "Success" });
});

// Mount product router
server.use("/products", productRouter);
server.use("/brand", brandRouter);
server.use("/category", categoryRouter);
server.use("/users", UserRouter);
server.use("/auth", authRouter);
server.use("/cart", cartRouter);
server.use("/orders", orderRouter);

// Start the server
server.listen(8080, () => {
    console.log("Server is listening on port 8080");
    connectUsingMongoose();
});
