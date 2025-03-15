import express from "express";
const router = express.Router(); 
import usercontroller from "../controllers/users.js";
import transactioncontroller from "../controllers/transaction.js";
import profilecontroller from "../controllers/profile.js"
import goalcontroller from "../controllers/goal.js";



router.post("/login",usercontroller.login);

router.post("/register",usercontroller.register);

router.get("/logout",profilecontroller.logout);


router.post("/transactionadd",transactioncontroller.transactionadd);

export default router;