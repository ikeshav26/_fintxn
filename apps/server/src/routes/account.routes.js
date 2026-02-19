import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  checkBalance,
  createAccount,
  getAccountDetails,
  getAccountStatement,
  getUserAccounts,
  userNetBalance,
  secureCheckBalance,
  secureNetBalance,
} from "../controller/account.controller.js";

const router = express.Router();

router.post("/create", auth, createAccount);
router.get("/balance/:accountId", auth, checkBalance);
router.get("/my-accounts", auth, getUserAccounts);
router.get("/statement/:accountId", auth, getAccountStatement);
router.get("/details/:accountId", auth, getAccountDetails);
router.get('/net-balance',auth,userNetBalance)
router.post('/secure-balance/:accountId', auth, secureCheckBalance)
router.post('/secure-net-balance', auth, secureNetBalance)

export default router;
