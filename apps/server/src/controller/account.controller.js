import Account from "../models/account.model.js";
import Ledger from "../models/ledger.model.js";
import { isMpinValid } from "../helper/helper.js";

export const createAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mpin } = req.body;

    const createAccount = await Account.create({ user: userId, mpin });
    res.status(201).json({
      message: "Account created successfully",
      account: createAccount,
    });
  } catch (err) {
    console.error("Account creation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const checkBalance = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const balance = await account.getbalance();
    res.status(200).json({ balance });
  } catch (err) {
    console.error("Error checking balance:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserAccounts = async (req, res) => {
  try {
    const userId = req.user.id;

    const accounts = await Account.find({ user: userId });
    res
      .status(200)
      .json({ message: "User accounts fetched successfully", accounts });
  } catch (err) {
    console.error("Error fetching user accounts:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAccountStatement = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }

    const accountStatements = await Ledger.find({
      account: accountId,
    }).populate("account");
    if (!accountStatements || accountStatements.length === 0) {
      return res
        .status(404)
        .json({ message: "Account not found or no statements available" });
    }

    res.status(200).json({
      message: "Account statements fetched successfully",
      accountStatements,
    });
  } catch (err) {
    console.error("Error fetching account statements:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAccountDetails = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }

    const account = await Account.findById(accountId).populate(
      "user",
      "username email",
    );
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res
      .status(200)
      .json({ message: "Account details fetched successfully", account });
  } catch (err) {
    console.error("Error fetching account details:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const freezeAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.status = "FROZEN";
    await account.save();

    res.status(200).json({ message: "Account frozen successfully", account });
  } catch (err) {
    console.error("Error freezing account:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deFreezeAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.status = "ACTIVE";
    await account.save();

    res.status(200).json({ message: "Account unfrozen successfully", account });
  } catch (err) {
    console.error("Error unfreezing account:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const verifyMpin = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const { mpin } = req.body;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }

    if (!mpin) {
      return res.status(400).json({ message: "MPIN is required" });
    }

    const isValid = await isMpinValid(accountId, mpin);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid MPIN" });
    }

    res.status(200).json({ message: "MPIN verified successfully" });
  } catch (err) {
    console.error("Error verifying MPIN:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const userNetBalance=async(req,res)=>{
  try{
    const userId=req.user.id;

    const accounts=await Account.find({user:userId});
    if(accounts.length===0){
      return res.status(404).json({message:"No accounts found for user"});
    }

    let netBalance=0;
    for(const account of accounts){
      const balance=await account.getbalance();
      netBalance+=balance;
    }

    res.status(200).json({message:"User net balance fetched successfully",netBalance});
  }catch(err){
    console.error("Error fetching user net balance:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const secureCheckBalance = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const { mpin } = req.body;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }
    if (!mpin) {
      return res.status(400).json({ message: "MPIN is required" });
    }

    const isValid = await isMpinValid(accountId, mpin);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid MPIN" });
    }

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const balance = await account.getbalance();
    res.status(200).json({ balance });
  } catch (err) {
    console.error("Error checking secure balance:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const secureNetBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountId, mpin } = req.body;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }
    if (!mpin) {
      return res.status(400).json({ message: "MPIN is required" });
    }

    const isValid = await isMpinValid(accountId, mpin);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid MPIN" });
    }

    const accounts = await Account.find({ user: userId });
    if (accounts.length === 0) {
      return res.status(404).json({ message: "No accounts found for user" });
    }

    let netBalance = 0;
    for (const account of accounts) {
      const balance = await account.getbalance();
      netBalance += balance;
    }

    res.status(200).json({ message: "Net balance fetched successfully", netBalance });
  } catch (err) {
    console.error("Error fetching secure net balance:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};