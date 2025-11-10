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

// Update a goal
const goalUpdate = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const { goalId, goalname, goalbudget, gdate } = req.body;
    if (!goalId) return res.status(400).render('goal', { msg: 'Missing goal id', msg_type: 'error' });
    try {
        const goal = await Goal.findOne({ _id: goalId, user_id: userId });
        if (!goal) return res.status(404).render('goal', { msg: 'Goal not found', msg_type: 'error' });
        goal.name = goalname || goal.name;
        goal.target_amount = goalbudget || goal.target_amount;
        if (gdate) goal.deadline = new Date(gdate).toISOString().split('T')[0];
        await goal.save();
        return res.redirect('/goal');
    } catch (e) {
        console.log(e);
        return res.status(500).render('goal', { msg: 'Error updating goal', msg_type: 'error' });
    }
}

// Delete a goal
const goalDelete = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const { goalId } = req.body;
    if (!goalId) return res.status(400).render('goal', { msg: 'Missing goal id', msg_type: 'error' });
    try {
        const g = await Goal.findOneAndDelete({ _id: goalId, user_id: userId });
        if (!g) return res.status(404).render('goal', { msg: 'Goal not found', msg_type: 'error' });
        return res.redirect('/goal');
    } catch (e) {
        console.log(e);
        return res.status(500).render('goal', { msg: 'Error deleting goal', msg_type: 'error' });
    }
}

export { goalUpdate, goalDelete };