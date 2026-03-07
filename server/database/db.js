import mongoose from "mongoose";

export const connectDB = () =>{
  mongoose.connect(process.env.mongoDB_URI)
  .then(()=>{
    console.log("Database connected successfully");
  })
  .catch((err)=>{
    console.log("error in connecting the database:",err);
  })
}