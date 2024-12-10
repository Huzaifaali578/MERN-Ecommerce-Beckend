import {BrandModel} from "../Model/Brand.js";

export const fetchBrands = async (req, res) => {
    try {
        const brands = await BrandModel.find().exec();
        res.status(200).json(brands)
    } catch (err) {
        res.status(400).json(err)
    }
};

export const createBrand = async (req, res) => {
    try {
        // console.log("Received Request Body:", req.body);
        const brands = new BrandModel(req.body);
        const savedbrands = await brands.save();
        res.status(201).json(savedbrands);
    } catch (err) {
        console.error("Error saving product:", err.message);
        res.status(400).json({ error: err.message });
    }
}