import Benificiary from "../models/benificiary.model.js";
import Account from "../models/account.model.js";

export const addBenificary=async(req,res)=>{
    try{
        const user=req.user.id;
        const {connectedAccount}=req.body;
        
        const toBeConnectAccount=await Account.findById(connectedAccount);
        if(!toBeConnectAccount){
            return res.status(404).json({message:"Account not found"})
        }
        if(toBeConnectAccount.user.toString()===user){
            return res.status(400).json({message:"You cannot add your own account as benificiary"})
        }

        const existingBenificiary=await Benificiary.findOne({user,connectedAccount});
        if(existingBenificiary){
            return res.status(400).json({message:"Benificiary already exists"})
        }

        const benificiary=new Benificiary({
            user,
            connectedAccount
        })
        await benificiary.save();
        res.status(201).json({message:"Benificiary added successfully",benificiary})

    }catch(err){
        res.status(500).json({message:err.message}) 
        console.log(err)
    }
}

export const getBenificaries=async(req,res)=>{
    try{
        const user=req.user.id;
        const benificaries=await Benificiary.find({user}).populate({path:'connectedAccount',populate:{path:'user',select:'name email'}})
        res.status(200).json({benificaries})
    }catch(err){
        res.status(500).json({message:err.message}) 
        console.log(err)
    }
}

export const deleteBenificary=async(req,res)=>{
    try{
        const user=req.user.id;
        const benificiaryId=req.params.id;
        const benificiary=await Benificiary.findById(benificiaryId);
        if(!benificiary){
            return res.status(404).json({message:"Benificiary not found"})
        }
        if(benificiary.user.toString()!==user){
            return res.status(403).json({message:"You are not authorized to delete this benificiary"})
        }
        await Benificiary.findByIdAndDelete(benificiaryId);
        res.status(200).json({message:"Benificiary deleted successfully"})
    }catch(err){
        res.status(500).json({message:err.message}) 
        console.log(err)
    }
}   