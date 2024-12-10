import express from "express";
import { createOrder, deleteOrder, fetchOrderByUser, updateOrder } from "../Controller/Order.js";

const orderRouter = express.Router();
// fetching Orders
orderRouter.get("/", fetchOrderByUser)
// Adding new order
orderRouter.post("/", createOrder);
// updating order
orderRouter.patch("/:id", updateOrder);
// Deleting Order
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
