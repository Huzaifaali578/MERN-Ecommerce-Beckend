import { UserModel } from "../Model/User.js";
import bcrypt from "bcrypt";
import { cookieExtractor, sanitizeUser } from "../services/commen.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    const savedUser = await user.save();
    req.login(sanitizeUser(savedUser), (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        const token = jwt.sign(sanitizeUser(savedUser), process.env.JWT_SECRET_KEY);
        res
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(201)
          .json(token);
      }
    });
    // res.status(201).json(sanitizeUser(savedUser));
  } catch (err) {
    console.error("Error saving product:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = (req, res) => {
  //   res.status(200).json({ message: "Login successful", user: req.user });
  console.log("login user", req.user)
    res
      .cookie("jwt", req.user.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json(req.user.token);
      // console.log("req.user.token", req.user.token)
};

export const checkAuth = (req, res) => {
  //   res.status(200).json({ message: "Login successful", user: req.user });
  if (req.user) {
    res.json(req.user)
    // console.log("check", req.user)
  } else {
    res.sendStatus(401)
  }
};
export const signOut = (req, res) => {
  try {
    // console.log("Logging out...");

    // Clear the JWT token cookie
    res.clearCookie('jwt', {
      httpOnly: true, // Ensures the cookie can't be accessed via JavaScript
      // secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      sameSite: 'Strict', // Adjust if frontend and backend domains are different
    });

    return res.status(200).json({ status: "success", message: "Logged out successfully." });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ status: "error", message: "Failed to log out." });
  }
};
