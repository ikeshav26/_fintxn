import express from "express";
import { registerWithOtp, resetPasswordWithOTp, sendOtpToResetPassword, verifyRegisterationOtp } from "../controller/otp.controller.js";

const router = express.Router();


router.post('/register/send-otp',registerWithOtp)
router.post('/register/verify-otp',verifyRegisterationOtp)
router.post('/reset-password/send-otp',sendOtpToResetPassword)
router.post('/reset-password',resetPasswordWithOTp)


export default router;