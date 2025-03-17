import connectDB from "../config/database.js";
import app from "../../app.js"; 
import User from "../models/user.js"

connectDB();
const userprofile=async(req,res)=>{
    const user_id = req.user ? req.user.id : null; 
    try{
        let getuser= await User.findOne({_id:user_id});
        let balance=app.locals.currentBalance; 
        let afterbal=balance*1.125;
        return res.render("profile",{
            uname:getuser.name,
            uemail:getuser.email,
            curbalance:balance,
            afterbal:afterbal
        });

    }catch(error){
        return res.status(404).json({message:"Profile rendering Error.."+error});
    }  
}
const logout=(req,res)=>{
    res.clearCookie("money_trac");
    console.log("Logged Out");
    return res.redirect("/login");
};
export default {userprofile,logout};