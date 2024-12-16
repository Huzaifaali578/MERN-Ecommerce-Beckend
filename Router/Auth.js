import express from "express";
import { checkAuth, createUser, loginUser, signOut } from "../Controller/Auth.js";
import passport from "passport";

const authRouter = express.Router();
   
authRouter.post("/signup", createUser);
authRouter.post("/login", passport.authenticate('local'), loginUser);
// authRouter.post("/login", passport.authenticate('jwt'), loginUser);
authRouter.get("/check", passport.authenticate('jwt'), checkAuth);
authRouter.get("/signout", signOut);


export default authRouter;
