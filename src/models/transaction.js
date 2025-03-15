import mongoose, { trusted } from "mongoose";

const transactionSchema=new mongoose.Schema({
    amount:{
        type:Number,
        required:[true,"please add Amount"]
    },
    date:{
        type:Date,
        default:Date.now
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    Payment:{
        type:String,
        default:"other"
    },
});

transactionSchema.index({user_id:1,date:-1});

export default mongoose.model('Transaction',transactionSchema);