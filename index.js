import express from "express";
import { connectUsingMongoose } from "./config.js";
import productRouter from "./Router/Product.js";
import brandRouter from "./Router/Brand.js";
import categoryRouter from "./Router/Category.js";
import cors from "cors";

const server = express();

// Middleware
server.use(express.json());
server.use(cors({
    exposedHeaders: ['X-Total-Count']
  }));

// Base route for health check
server.get("/", (req, res) => {
    res.json({ Status: "Success" });
});

// Mount product router
server.use("/products?", productRouter);
server.use("/brand", brandRouter);
server.use("/category", categoryRouter);

// Start the server
server.listen(8080, () => {
    console.log("Server is listening on port 8080");
    connectUsingMongoose();
});
