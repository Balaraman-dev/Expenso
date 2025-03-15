import connectDB from "../config/database.js";
import Goal from "../models/goals.js";


connectDB();
const goals=async(req,res)=>{
    const userId = req.user ? req.user.id : null; 
    if (req.method === "GET") {
        try{
            const goals=await Goal.find({user_id: userId});
            return res.render("goal",{goals});
           
        }catch(error){
            res.status(404).json({message:"Error in GET goal"+error});
        };
    }
    else{
        const{goalname , goalbudget , gdate} = req.body;
        try{
            if(!(goalname && goalbudget && gdate)){
                return res.render("goal",{msg:"Please fill all fields",msg_type:"error"});
          }
          else{
              const formattedDate = new Date(gdate).toISOString().split('T')[0];
               let newgoal= new Goal({
                           name:goalname,
                           target_amount:goalbudget,
                           deadline:formattedDate,
                           user_id:userId
                       });
                       await newgoal.save();
              return res.redirect("/goal");  
          }
        }catch(error){
            res.status(404).json({messgae:"Error occured in goal  "+error});
        }
    }

}

export default{goals};