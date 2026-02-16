import Account from "../models/account.model.js";

export const createAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const createAccount = await Account.create({ user: userId });
    res
      .status(201)
      .json({
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
