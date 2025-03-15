import connectDB from "../config/database.js";
import Transaction from "../models/transaction.js";
import Category from "../models/category.js";
connectDB();


const transactionadd=async(req,res)=>{
    const userId = req.user ? req.user.id : null;  

    const{cdate,payment,category,amount,desc,tab}=req.body;
    try{
        if(!(cdate && payment && category && amount && desc && tab)){
            return res.render("transaction",{msg:"Fill all fields",msg_type:"error"});
        }
        let newCategory=new Category({
            name:category,
            type:tab,
            user_id:userId,
        });
        await newCategory.save();
        
        let newTransaction=new Transaction({
            amount:amount,
            date:cdate,
            description:desc,
            Payment:payment,
            user_id:userId,
            category_id: newCategory._id
        });
        await newTransaction.save();

     return res.status(202).redirect("/home");
    }catch(e){
      res.status(404).json({msg:"Error occured in transaction add"});
      console.log(e);
    }
   
}
export default {transactionadd};