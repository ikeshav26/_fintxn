import mongoose from "mongoose";
import Account from "../models/account.model.js"
import Transaction from "../models/transaction.model.js";
import Ledger from "../models/ledger.model.js";
import { sendTransactionSuccesfulMail } from "../services/email.service.js";


export const createTransaction=async(req,res)=>{
    try{
        const { fromAccount, toAccount, amount, idempotencyKey } = req.body

        if(!fromAccount || !toAccount || !amount || !idempotencyKey){
            return res.status(400).json({ error: "Missing required fields: fromAccount, toAccount, amount, idempotencyKey" })
        }

        const fromUserAccount=Account.findById(fromAccount);
        const touserAccount=Account.findById(toAccount);
        
        if(!fromUserAccount || !touserAccount){
            return res.status(404).json({ error: "One or both accounts not found" })
        }

        const isTransactionAlreadyExists=await Transaction.findOne({ idempotencyKey })
        if(isTransactionAlreadyExists){
            if(isTransactionAlreadyExists.status==="COMPLETED"){
                return res.status(200).json({ message: "Transaction already completed", transaction: isTransactionAlreadyExists })
            }
            if(isTransactionAlreadyExists.status==="PENDING"){
                return res.status(200).json({ message: "Transaction is already in progress" })
            }
            if(isTransactionAlreadyExists.status==="FAILED"){
                return res.status(200).json({ message: "Previous transaction attempt failed, you can retry"})
            }
            if(isTransactionAlreadyExists.status==="REVERSED"){
                return res.status(200).json({ message: "Previous transaction was reversed, you can retry"})
            }
        }


        if(fromUserAccount.status!=="ACTIVE" || touserAccount.status!=="ACTIVE"){
            return res.status(400).json({ error: "Both accounts must be active to perform a transaction" })
        }

        const balance=await fromUserAccount.getbalance()
        if(balance<amount){
            return res.status(400).json({ error: `Insufficient balance in the from account. Available balance: ${balance} and requested amount: ${amount}` })
        }

        const session=mongoose.startSession()
        session.startTransaction()

        const transaction=await Transaction.create({
            fromAccount,
            toAccount,
            amount,
            idempotencyKey,
            status:"PENDING"
        },{ session })

        const debitLedgerEntry=await Ledger.create({
            account: fromAccount,
            amount,
            transaction: transaction._id,
            type: "DEBIT"
        },{ session })

        const creditLedgerEntry=await Ledger.create({
            account: toAccount,
            amount,
            transaction: transaction._id,
            type: "CREDIT"
        },{ session })


        transaction.status="COMPLETED"
        await transaction.save({ session })

        await session.commitTransaction()
        session.endSession()

        await sendTransactionSuccesfulMail(fromUserAccount.email,fromUserAccount.username,amount,touserAccount.username)
        res.status(201).json({ message: "Transaction completed successfully", transaction })
    }catch(err){
            res.status(500).json({ error: "An error occurred while creating the transaction", details: err.message })
            console.error("Error creating transaction:", err)
    }
}