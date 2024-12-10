import { CartModel } from "../Model/Cart.js";

export const fetchCartByUser = async (req, res) => {
  try {
    // Extract the user parameter from the query
    const { user } = req.query;

    // Check if the user parameter is provided
    if (!user) {
      return res
        .status(400)
        .json({ error: "User query parameter is required" });
      }
      
    // Fetch cart items by user, populating references
    const cartItems = await CartModel.find({ user }) // Matches the `user` field in CartModel
      .populate("user") // Populate user details (match schema field)
      .populate("product") // Populate product details (match schema field)
          .exec();
      
    // Send cart items as response
    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { product, user, quantity } = req.body;

    if (!product || !user || !quantity) {
      return res
        .status(400)
        .json({ error: "Product, user, and quantity are required." });
    }

    const cart = new CartModel({ product, user, quantity });
    const savedCart = await cart.save();

    // Populate the `product` and `user` fields in the saved cart item
    const populatedCart = await savedCart.populate("product")
    res.status(201).json(populatedCart);
  } catch (err) {
    console.error("Error saving cart:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const updateCart = async (req, res) => {
    try {
        console.log(req.body)
        const { id } = req.params;
        console.log(id)
        const cart = await CartModel.findByIdAndUpdate(id, req.body, { new: true });
        await cart.populate("product")
        console.log(cart)
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).json(err)
    }
}

export const deleteItemFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await CartModel.findByIdAndDelete(id, req.body, { new: true });
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).json(err)
    }
}
