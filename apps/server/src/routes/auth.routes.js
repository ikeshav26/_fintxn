import express from "express";
import { loginUser, logout, registerUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout',logout)

export default router;
