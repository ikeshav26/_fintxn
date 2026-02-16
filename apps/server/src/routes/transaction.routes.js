import express from "express";
import {
  addTestCredits,
  createTransaction,
} from "../controller/transaction.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", auth, createTransaction);
router.post("/add-test-credits/:accountId", auth, addTestCredits);

export default router;
