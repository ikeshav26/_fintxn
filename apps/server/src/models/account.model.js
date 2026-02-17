import mongoose from "mongoose";
import Ledger from "./ledger.model.js";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ACTIVE", "FROZEN", "CLOSED"],
        message: "Status must be either ACTIVE, FROZEN, or CLOSED",
      },
      default: "ACTIVE",
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "INR",
    },
    mpin:{
      type:String,required:[true,"MPIN is required"],
       minlength:[4,"MPIN must be at least 4 digits"],
       maxlength:[6,"MPIN must be at most 6 digits"],
       validate:{
        validator:function(v){
          return /^\d+$/.test(v);
        },
        message:"MPIN must contain only digits"
       }
    }
  },
  { timestamps: true },
);

accountSchema.index({ user: 1, status: 1 });

accountSchema.methods.getbalance = async function () {
  const balance = await Ledger.aggregate([
    { $match: { account: this._id } },
    {
      $group: {
        _id: null,
        totalCredit: {
          $sum: {
            $cond: [{ $eq: ["$type", "CREDIT"] }, "$amount", 0],
          },
        },
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$type", "DEBIT"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        balance: { $subtract: ["$totalCredit", "$totalDebit"] },
      },
    },
  ]);

  if (balance.length === 0) {
    return 0;
  }
  return balance[0].balance;
};

const Account = mongoose.model("Account", accountSchema);
export default Account;
