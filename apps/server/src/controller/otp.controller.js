import { createOtp, isOtpExpired } from "../helper/helper.js";
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import {
  sendPasswordResetOtp,
  sendRegisterationOtp,
} from "../services/email.service.js";

export const registerWithOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = await createOtp(email);

    await sendRegisterationOtp(email, otp).catch((err) =>
      console.error("Error sending OTP email:", err),
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const verifyRegisterationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const isValid = await isOtpExpired(email, otp);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const sendOtpToResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = await createOtp(email);

    await sendPasswordResetOtp(email, otp).catch((err) =>
      console.error("Error sending OTP email:", err),
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const resetPasswordWithOTp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, OTP and new password are required" });
    }

    const isValid = await isOtpExpired(email, otp);
    if (!isValid) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
