import Account from "../models/account.model.js";
import Ledger from "../models/ledger.model.js";

export const createAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const createAccount = await Account.create({ user: userId });
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

export const getUserAccounts=async(req,res)=>{
  try{
    const userId=req.user.id;
    
    const accounts=await Account.find({user:userId});
    res.status(200).json({ message: "User accounts fetched successfully", accounts });
    
  }catch(err){
    console.error("Error fetching user accounts:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const getAccountStatement=async(req,res)=>{
  try{
    const accountId=req.params.accountId;

    if(!accountId){
      return res.status(400).json({ message: "Account ID is required" });
    }

    const accountStatements=await Ledger.find({account:accountId}).populate("account");
    if(!accountStatements || accountStatements.length === 0){
      return res.status(404).json({ message: "Account not found or no statements available" });
    }

    res.status(200).json({ message: "Account statements fetched successfully", accountStatements });
  }catch(err){
    console.error("Error fetching account statements:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const getAccountDetails=async(req,res)=>{
  try{
    const accountId=req.params.accountId;

    if(!accountId){
      return res.status(400).json({ message: "Account ID is required" });
    }

    const account=await Account.findById(accountId).populate("user", "username email");
    if(!account){
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account details fetched successfully", account });
  }catch(err){
    console.error("Error fetching account details:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}