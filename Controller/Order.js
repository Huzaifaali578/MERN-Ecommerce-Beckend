import { OrderModel } from "../Model/Order.js";

export const fetchOrderByUser = async (req, res) => {
  const { id } = req.user;
  console.log(req.user)
  console.log("fetchOrderByUser", id)
  try {
    const orders = await OrderModel.find({ user: id });
    // console.log(orders)
    console.log("orders", orders )
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
      console.log("updateOrder",req.body)
      console.log("updateOrder id",id)
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

export const fetchAllOrder = async (req, res) => {
  try {
    // const { category } = req.query;
    let condition = {};

    // If not admin, exclude deleted products
    //   if (!req.query.admin) {
    //     condition.deleted = { $ne: true };
    //   }

    // Initialize query and total count query
    let query = OrderModel.find({deleted: {$ne: true}});
    let totalOrderQuery = OrderModel.find({deleted: {$ne: true}});


    // Handle sorting
    if (req.query._sort && req.query._order) {
      const sortOrder = req.query._order.toLowerCase() === "desc" ? -1 : 1;
      query = query.sort({ [req.query._sort]: sortOrder });
    }

    // Get total product count for pagination
    const totalDocs = await totalOrderQuery.countDocuments();

    // Handle pagination
    if (req.query._page && req.query._per_page) {
      const pageSize = parseInt(req.query._per_page, 10);
      const page = parseInt(req.query._page, 10);
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    // Execute query
    const docs = await query.exec();
    // console.log(docs)

    // Set headers and send response
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    console.error("Error fetching Orders:", err);
    res.status(400).json({ error: err.message });
  }
};
