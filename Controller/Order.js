import { OrderModel } from "../Model/Order.js";

export const fetchOrderByUser = async (req, res) => {
  // const { id } = req.query;
  console.log(req.query)
  try {
    const orders = await OrderModel.find(req.query);
    console.log(orders)
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createOrder = async (req, res) => {
  try {
    // const { product, user, quantity } = req.body;

    // if (!product || !user || !quantity) {
    //   return res
    //     .status(400)
    //     .json({ error: "Product, user, and quantity are required." });
    // }

    const order = new OrderModel(req.body);
    const savedOrder = await order.save();

    // Populate the `product` and `user` fields in the saved cart item
    // const populatedCart = await savedCart.populate("product")
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error saving cart:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const updateOrder = async (req, res) => {
    try {
        // console.log(req.body)
        const { id } = req.params;
        // console.log(id)
        const order = await OrderModel.findByIdAndUpdate(id, req.body, { new: true });
        // await cart.populate("product")
        // console.log(cart)
        res.status(200).json(order)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findByIdAndDelete(id, req.body, { new: true });
        res.status(200).json(order)
    } catch (err) {
        res.status(400).json(err)
    }
}
