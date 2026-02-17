import Account from "../models/account.model.js";


export const isMpinValid=async(accountId,mpin)=>{
    try{
        const account=await Account.findById(accountId);
        if(!account){
            throw new Error("Account not found");
        }
        return account.mpin===mpin;
    }catch(err){
        console.error("Error validating MPIN:", err);
        throw new Error("Server error");
    }
}