import bcrypt from "bcrypt";
import User from "../model/User.js";
import { generateToken } from "../lib/utils.js";


export const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Min. password length is 6" });
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // generateToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

