import mongoose from "mongoose"; 

const connectDB = async () => {

  try {
  await mongoose.connect(process.env.MONGODB_URI,
  {
      dbName:"money",
      serverSelectionTimeoutMS: 10000, 
      socketTimeoutMS: 45000,
  }
  );
    console.log("MongoDB Connected"); 
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message); 
    process.exit(1);
  }
};


export default connectDB;