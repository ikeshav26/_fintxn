import Account from "../models/account.model.js";


export const createAccount=async(req,res)=>{
    try{
        const userId=req.user.id;

        const createAccount=await Account.create({user:userId});
        res.status(201).json({ message: "Account created successfully", account: createAccount });
    }catch(err){
        console.error("Account creation error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}