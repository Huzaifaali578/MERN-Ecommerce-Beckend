import { UserModel } from "../Model/User.js";

export const createUser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const savedUser = await user.save();
        res.status(201).json({id: savedUser.id, role: savedUser.role});
    } catch (err) {
        console.error("Error saving product:", err.message);
        res.status(400).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email }).exec();
        if (!user) {
            res.status(401).json({message: "User not found"})
        }else if (user.password === req.body.password) {
            res.status(201).json({id: user.id, email: user.email, role: user.role});
        } else {
            res.status(401).json({message: "Invalid Credentials"})
        }
    } catch (err) {
        console.error("Error saving product:", err.message);
        res.status(400).json({ error: err.message });
    }
};