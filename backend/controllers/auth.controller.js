import bcrypt from "bcrypt";
import User from "../model/User.js";
import { generateToken } from "../lib/utils.js";
import 'dotenv/config';
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import cloudinary from "../lib/cloudinary.js";


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

        
        const savedUser = await newUser.save();
        generateToken(newUser._id, res);


        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic
        });
        try{
            await sendWelcomeEmail(savedUser.email, savedUser.username, process.env.CLIENT_URL);
        }
        catch(err){
            console.error("Error sending welcome email:", err); 
            res.status(400).json({message: "User created but failed to send welcome email"});
        }


    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const Signin = async (req, res) => {
    
    const { email, password } = req.body;
    if(!email || !password){
     return res.status(400).json({message: "All fields are required"});
    }
    try{
      
      console.log("entered in signin try block");
      const user = await User.findOne({email});
      if(!user) return res.status(400).json({message: "Invalid credentials"});

      const isPassCheck = await bcrypt.compare(password,user.password);
      if(!isPassCheck) return res.status(400).json({message: "Invalid credentials"});

      generateToken(user._id,res);

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        status:"Login successful",
        profilePic: user.profilePic
      });

    }catch(err){
        res.status(500).json({message: "Internal server error", err: err.message});
    }
}

export const Signout = async (req, res) => {
    // res.cookie("jwt", "", {maxage:0, httpOnly:true, secure: process.env.NODE_ENV === "production"});
    res.cookie("jwt", "", {maxAge:0});
    res.status(200).json({message: "Signout successful"});
}

export const updateProfile = async (req, res) => {

    try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id; // auth user in protectRoute middleware set req.user

    //uploading profile pic to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    //updating user profile pic in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}