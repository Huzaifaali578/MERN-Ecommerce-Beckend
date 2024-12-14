import { UserModel } from "../Model/User.js";
import bcrypt from "bcrypt";
import { sanitizeUser } from "../services/commen.js";
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
    res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};

export const checkAuth = (req, res) => {
  //   res.status(200).json({ message: "Login successful", user: req.user });
  if (req.user) {
    res.json(req.user)
  } else {
    res.sendStatus(401)
  }
};
