import { UserModel } from "../Model/User.js";
import mongoose from 'mongoose';

export const fetchUserById = async (req, res) => {
  try {
    const id  = req.user.id;
    console.log("req.user:", id);

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // Fetch user by ID and select specific fields
    const user = await UserModel.findById(id, 'name email id role addresses').exec();
    console.log("Fetched user:", user);

    // Handle case where user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findByIdAndUpdate(id, req.body, {new:true});
      res.status(201).json(user);
    } catch (err) {
      console.error("Error saving product:", err.message);
      res.status(400).json({ error: err.message });
    }
  };

