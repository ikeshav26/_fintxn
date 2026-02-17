import Account from "../models/account.model.js";
import OTP from "../models/otp.model.js";

export const isMpinValid = async (accountId, mpin) => {
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    return account.mpin === mpin;
  } catch (err) {
    console.error("Error validating MPIN:", err);
    throw new Error("Server error");
  }
};

export const isOtpExpired = async (email, otp) => {
  try {
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const timeOfCreation = otpRecord.createdAt;
    const currentTime = new Date();
    const timeDifference = (currentTime - timeOfCreation) / 1000;

    if (timeDifference > 180) {
      await OTP.deleteOne({ email });
      return false;
    }

    await OTP.deleteOne({ email });
    return true;
  } catch (err) {
    console.error("Error validating OTP:", err);
    throw new Error("Server error");
  }
};

export const createOtp = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email, otp });
    return otp;
  } catch (err) {
    console.error("Error creating OTP:", err);
    throw new Error("Server error");
  }
};
