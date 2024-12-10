import express from "express";
import { createOrder, deleteOrder, fetchAllOrder, fetchOrderByUser, updateOrder } from "../Controller/Order.js";

const orderRouter = express.Router();
// fetching Orders
orderRouter.get("/user/:id", fetchOrderByUser)
// Adding new order
// fetching All Orders
orderRouter.get("/", fetchAllOrder)
// Adding new order
orderRouter.post("/", createOrder);
// updating order
orderRouter.patch("/:id", updateOrder);
// Deleting Order
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
