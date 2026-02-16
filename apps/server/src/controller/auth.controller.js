import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendLoginEmail, sendRegisterationEmail } from "../services/email.service.js";


export const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "Email already in use" });
        }

        const user=await User.create({username,email,password});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});
        res.cookie("token",token)

        res.status(201).json({ message: "User registered successfully", user:{
            id:user._id,
            username:user.username,
            email:user.email,
        },token});

        await sendRegisterationEmail(email);
    }catch(err){
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}


export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const user=await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const strpass = String(password);

        const isValidPassword=await user.comparePassword(strpass);
        if(!isValidPassword){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});
        res.cookie("token",token)

        await sendLoginEmail(email).catch(err => console.error("Error sending login email:", err));

        res.status(200).json({ message: "User logged in successfully", user:{
            id:user._id,
            username:user.username,
            email:user.email,
        },token});
    }catch(err){
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}