import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add Name '],
        trim:true
    },
    email:{
        type:String,
        required:[true,"please add email"],
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
         'Please add a valid email']
    },
    password_hash:{
        type:String,
        required:[true,"please add password"],
        minlength:4,
        select:false
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

userschema.pre('save', async function(next) {
    if (!this.isModified('password_hash')) {
      next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
  });
  
  userschema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password_hash);
  };
  
  export default mongoose.model('User', userschema);