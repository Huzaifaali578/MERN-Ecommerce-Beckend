import {CategoryModel} from "../Model/Category.js";

export const fetchCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().exec();
        console.log(categories)
        res.status(200).json(categories)
    } catch (err) {
        res.status(400).json(err)
    }
};

export const createCategory = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);
        const category = new CategoryModel(req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        console.error("Error saving product:", err.message);
        res.status(400).json({ error: err.message });
    }
}