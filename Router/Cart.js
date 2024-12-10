import express from "express";
import { addToCart, deleteItemFromCart, fetchCartByUser, updateCart } from "../Controller/Cart.js";

const cartRouter = express.Router();
// fetching cart items
cartRouter.get("/", fetchCartByUser)
// Adding new item in cart
cartRouter.post("/", addToCart);
// updating cart items like quantity etc.
cartRouter.patch("/:id", updateCart);
// Deleting item from cart
cartRouter.delete("/:id", deleteItemFromCart);

export default cartRouter;
