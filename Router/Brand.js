import express from "express";
import { createBrand, fetchBrands } from "../Controller/Brand.js";

const brandRouter = express.Router();

brandRouter.get("/", fetchBrands);
brandRouter.post("/", createBrand);

export default brandRouter;
