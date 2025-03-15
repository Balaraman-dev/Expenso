import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add Category Name"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "Please Specify Category type"],
        enum: ['income', 'expense'],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Category', CategorySchema);
