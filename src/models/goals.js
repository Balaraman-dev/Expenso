 import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a goal name'],
    trim: true
  },
  target_amount: {
    type: Number,
    required: [true, 'Please add a target amount']
  },
  deadline: {
    type:String,
    required: [true, 'Please add a deadline']
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

export default mongoose.model('Goal', GoalSchema);