import express from "express";
import { createCategory, fetchCategories } from "../Controller/Category.js";

const categoryRouter = express.Router();

categoryRouter.get("/", fetchCategories)
    
categoryRouter.post("/", createCategory);

export default categoryRouter;
