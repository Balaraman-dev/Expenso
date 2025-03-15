import connectDB from "../config/database.js";
import Transaction from "../models/transaction.js";
import Category from "../models/category.js";
import app from "../../app.js"; 
connectDB();

const statistic=async(req,res)=>{
    const user_id = req.user ? req.user.id : null; 
    let balance=app.locals.currentBalance;  

    if(req.method=="POST"){
        const{fromdate,todate}=req.body;
        try{
            if(!(fromdate && todate)){
                return res.render("statistic",{msg:"Please Fill all Fields",msg_type:"error"});
            }
            else{
                const new_fromdate = new Date(fromdate).toISOString().split('T')[0];
                const new_todate=new Date(todate).toISOString().split('T')[0];

                const transactions=await Transaction.find({user_id});
                let post_stat_data=[];
                for (let transaction of transactions) {
                const category = await Category.findById(transaction.category_id);
                if (category) {
                    let new_trans_date = new Date(transaction.date).toISOString().split('T')[0];
                    const entry = {
                        category_name: category.name,
                        category_type:category.type,
                        amount: transaction.amount,
                        date:new_trans_date,
                    };
                    if (new_trans_date >= new_fromdate && new_trans_date <= new_todate){
                        post_stat_data.push(entry);
                    }
                }
            }
               return res.render("statistic",{
                stat_data:post_stat_data,
                balance:balance,
               });
            }
        }catch(error){
            return res.status(404).json({message:"Error Occurs in Statistic Pages."+error});
        }
        
    }
    
    
    else{
        try{
            const transactions=await Transaction.find({user_id});
            let stat_data=[];
            for (let transaction of transactions) {
            const category = await Category.findById(transaction.category_id);
            if (category) {
                let new_trans_date = new Date(transaction.date).toISOString().split('T')[0];
                const entry = {
                    category_name: category.name,
                    category_type:category.type,
                    amount: transaction.amount,
                    date:new_trans_date,
                };
             stat_data.push(entry);
            }
        }
           return res.render("statistic",{
            stat_data:stat_data,
            balance:balance,
           });
        }catch(error){
            return res.status(404).json({message:"Error Occurs in Statistic Pages."+error});
        }
    }
}
export default {statistic};