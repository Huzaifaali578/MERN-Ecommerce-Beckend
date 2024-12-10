import express from "express";
import { fetchUserById, updateUser } from "../Controller/User.js";

const UserRouter = express.Router();

UserRouter.get("/:id", fetchUserById)
    
UserRouter.patch("/:id", updateUser);

export default UserRouter;
