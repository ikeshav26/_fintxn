import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Ledger must be associated with an account"],
    index: true,
    immutable: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required for creating a ledger entry"],
    immutable: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: [true, "Ledger must be associated with a transaction"],
    index: true,
    immutable: true,
  },
  type: {
    type: String,
    enum: {
      values: ["CREDIT", "DEBIT"],
      message: "Type can be either CREDIT or DEBIT",
    },
    required: [true, "Ledger type is required"],
    immutable: true,
  },
});

function preventModeification() {
  throw new Error("Ledger entries cannot be modified after creation");
}

ledgerSchema.pre("deleteMany", preventModeification);
ledgerSchema.pre("deleteOne", preventModeification);
ledgerSchema.pre("findOneAndDelete", preventModeification);
ledgerSchema.pre("findOneAndRemove", preventModeification);
ledgerSchema.pre("findOneAndUpdate", preventModeification);
ledgerSchema.pre("updateOne", preventModeification);
ledgerSchema.pre("updateMany", preventModeification);

const Ledger = mongoose.model("Ledger", ledgerSchema);
export default Ledger;
