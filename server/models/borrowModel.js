import mongoose from "mongoose";
const BorrowBookSchema = new mongoose.Schema({
  user:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"UserdataSchema",
      required:true,
    },
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    },
  },
  price:{
    type:Number,
    required:true,
  },
  book:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Book",
    required:true,
  },
  borrowedDate:{
    type: Date,
    default:Date.now,
  },
  dueDate:{
    type: Date,
    required:true,
  },
  returnDate:{
    type: Date,
  },
  fine:{
    type:Number,
    default:0,
  },
  notified:{
    type:Boolean,
    default:false,
  },
},
{timestamps:true},
);
export const BorrowData = mongoose.model("Borrow", BorrowBookSchema);