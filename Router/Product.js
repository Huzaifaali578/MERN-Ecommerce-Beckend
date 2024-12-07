import express from "express";
import { createProduct, fetchAllProduct, fetchProductById, updateProduct } from "../Controller/Product.js";

const productRouter = express.Router();

// POST /products - Create a new product
productRouter.post("/", createProduct);

// GET /products - Fetch all products
productRouter.get("/", fetchAllProduct);

// GET /products - Fetch products by if
productRouter.get("/:id", fetchProductById);

// PATCH /products - Update products by id
productRouter.patch("/:id", updateProduct);

export default productRouter;
