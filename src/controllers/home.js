import connectDB from "../config/database.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import Category from "../models/category.js";
import { json } from "express";
import app from "../../app.js";

connectDB();

const userdatas=async(req,res)=>{
    const user_id = req.user ? req.user.id : null; 
    try{
        const users = await User.findById(user_id);

        const transactions = await Transaction.find({user_id});
        let totalIncome = 0;
        let totalExpense = 0;
        let income = [];
        let expense = [];

        for (let transaction of transactions) {
            const category = await Category.findById(transaction.category_id);
            if (category) {
                const entry = {
                    category_name: category.name,
                    amount: transaction.amount,
                };

                if (category.type === "income") {
                    totalIncome += transaction.amount;
                    income.push(entry);
                } else if (category.type === "expense") {
                    totalExpense += transaction.amount;
                    expense.push(entry);
                }
            }
        }
        const curBalance = totalIncome - totalExpense;

        app.locals.currentBalance = curBalance; 
        
        return res.render("home",{ 
            uname: users.name, 
            balance: curBalance, 
            income:income, 
            expense:expense 
        });

    } catch(error) {
        res.status(500).json({ error: "Server Error" });
        console.log(error);
        }
    };
        

export default{userdatas};