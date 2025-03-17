import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "../config/database.js";
import User from "../models/user.js";
import { promisify } from "util";


connectDB();
 const register=async(req,res)=>{
    console.log("form registered",req.body);
    const{username,email,password,cpassword}=req.body;
    try{
        let existing_user=await User.findOne({email});
        if(existing_user){
            return res.render("register",{msg:"Username Already Exists",msg_type:"error"})
        }
        else if(password!==cpassword){
            return res.render("register",{msg:"Password is not Similar",msg_type:"error"})
        }
        let hashedpassword= password;

        let newUser=new User({
            name:username,
            email:email.toLowerCase(),
            password_hash:hashedpassword,
        });
        await newUser.save();
        res.status(201).redirect("/login");

    }catch(error){
         console.log("Error Occured "+error);
         res.status(500).json({message:"Internal server error"});
    }    
};

const login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
       return res.status(400).render("login",{msg:"Fill All fields",msg_type:"error"});
    }

    try{ 
        let existing_user = await User.findOne({ email }).select("+password_hash");
        if(!existing_user){
            return res.status(400).render("login",{msg:"The user is doesn't exists",msg_type:"error"});
        }
        else{
            if(!(await bcrypt.compare(password,existing_user.password_hash))){
                return res.status(401).render("login",{msg:"Please Enter valid password",msg_type:"error"});
            }
            else{
                const id=existing_user._id;
                const token=jwt.sign({id},process.env.jwt_secret,{
                    expiresIn:process.env.jwt_expires_in,
                })
                const cookieoption={
                    expires:new Date(Date.now()+process.env.jwt_cookie_expires*24*60*60*1000),
                 httpOnly:true,
                  };
                  res.cookie("money_trac",token,cookieoption);
                  res.status(200).redirect("/home");
            }
        }
    }catch(error){
        console.log("Error Occured "+error);
        res.status(500).json({message:"Internal server error"});
    }
}

 const isloggedin = async (req, res, next) => {

    if (req.cookies.money_trac) {
        try {
            const decode = await promisify(jwt.verify)(
                req.cookies.money_trac,
                process.env.jwt_secret
            );
            const user = await User.findById(decode.id); 
            if (user) {
                req.user = user; 
            }
        } catch (error) {
            console.log(error);
        }
    }
    next();
};



export default { register, login, isloggedin};