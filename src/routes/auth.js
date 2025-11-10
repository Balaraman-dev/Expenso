import express from "express";
const router = express.Router(); 
import usercontroller from "../controllers/users.js";
import transactioncontroller from "../controllers/transaction.js";
import profilecontroller from "../controllers/profile.js"

router.post("/login",usercontroller.login);

router.post("/register",usercontroller.register);

router.get("/logout",profilecontroller.logout);

router.post("/transactionadd",transactioncontroller.transactionadd);
router.post("/transactionedit", transactioncontroller.transactionUpdate);
router.post("/transactiondelete", transactioncontroller.transactionDelete);

export default router;