import express from "express";
import { fetchUserById, updateUser } from "../Controller/User.js";

const UserRouter = express.Router();

UserRouter.get("/own", fetchUserById)
    
UserRouter.patch("/:id", updateUser);

export default UserRouter;
