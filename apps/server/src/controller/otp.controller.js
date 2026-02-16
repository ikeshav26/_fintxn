import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { sendPasswordResetOtp, sendRegisterationOtp } from "../services/email.service.js";



export const registerWithOtp=async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }

        const otp=Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.create({email,otp});

        await sendRegisterationOtp(email, otp).catch(err => console.error("Error sending OTP email:", err));

        res.status(200).json({ message: "OTP sent to email" });
    }catch(err){
        console.error("Error sending OTP:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}


export const verifyRegisterationOtp=async(req,res)=>{
    try{
        const {email,otp}=req.body;
        if(!email || !otp){
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const otpRecord=await OTP.findOne({email,otp});
        if(!otpRecord){
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const timeOfCreation=otpRecord.createdAt;
        const currentTime=new Date();
        const timeDifference=(currentTime - timeOfCreation) / 1000;

        if(timeDifference > 180){
            await OTP.deleteOne({email});
            return res.status(400).json({ message: "OTP has expired" });
        }

        await OTP.deleteOne({email});

        res.status(200).json({ message: "OTP verified successfully" });
    }catch(err){
        console.error("Error verifying OTP:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export const sendOtpToResetPassword=async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const otp=Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.create({email,otp});

        await sendPasswordResetOtp(email, otp).catch(err => console.error("Error sending OTP email:", err));

        res.status(200).json({ message: "OTP sent to email" });
    }catch(err){
        console.error("Error sending OTP:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export const resetPasswordWithOTp=async(req,res)=>{
    try{
        const {email,otp,newPassword}=req.body;
        if(!email || !otp || !newPassword){
            return res.status(400).json({ message: "Email, OTP and new password are required" });
        }

        const otpRecord=await OTP.findOne({email,otp});
        if(!otpRecord){
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const timeOfCreation=otpRecord.createdAt;
        const currentTime=new Date();
        const timeDifference=(currentTime - timeOfCreation) / 1000;

        if(timeDifference > 180){
            await OTP.deleteOne({email});
            return res.status(400).json({ message: "OTP has expired" });
        }

        user.password=newPassword;
        await user.save();

        await OTP.deleteOne({email});

        res.status(200).json({ message: "Password reset successfully" });
    }catch(err){
        console.error("Error resetting password:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}