import express from "express";
import User from "../models/user.js";
import usercontroller from "../controllers/users.js";
import homecontroller from "../controllers/home.js";
import goalcontroller, { goalUpdate, goalDelete } from "../controllers/goal.js";
import profilecontroller from "../controllers/profile.js";
import statisticcontroller from "../controllers/statistic.js";

const router = express.Router(); 

router.get(["/","/login"],(req,res)=>{
    res.render("login");
})

router.get("/register",(req,res)=>{
    res.render("register");
})

router.use(usercontroller.isloggedin);

router.get("/home",homecontroller.userdatas)

router.post("/goal",goalcontroller.goals);
router.get("/goal",goalcontroller.goals);
router.post('/goal/update', goalUpdate);
router.post('/goal/delete', goalDelete);


router.get("/transaction",(req,res)=>{
    res.render("transaction");
})

router.get("/profile",profilecontroller.userprofile);

router.get("/statistic",statisticcontroller.statistic);
router.post("/statistic",statisticcontroller.statistic);

 
export default router;