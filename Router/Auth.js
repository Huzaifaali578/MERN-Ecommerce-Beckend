import express from "express";
import { fetchUserById, updateUser } from "../Controller/User.js";
import { createUser, loginUser } from "../Controller/Auth.js";

const authRouter = express.Router();
   
authRouter.post("/signup", createUser);
authRouter.post("/login", loginUser);

export default authRouter;
