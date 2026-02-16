import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  checkBalance,
  createAccount,
} from "../controller/account.controller.js";

const router = express.Router();

router.post("/create", auth, createAccount);
router.get("/balance/:accountId", auth, checkBalance);

export default router;
