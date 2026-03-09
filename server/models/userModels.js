import { genSaltSync } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  booksBorrowed: [
    {
      bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Borrow",
      },
      hasReturned: {
        type: Boolean,
        default: false,
      },
      bookTitLe:  String,
      borrowedDate: Date,
      Duedate: Date,
    },
  ],
  avatar: {
    publicID: String,
    url: String,
  },//only for admin
  verificationCode:Number,
  verificationCodedate:Date,
  resetPasswordToken:String,
  resetPasswordExpire:Date,
},
  {
    timestamps:true,
  }
);

//we will not keep 0 as its first number of the verification code
userSchema.methods.generateVerificationCode = function () {
  const code = Math.floor(100000 + Math.random() * 900000).toString();//generate 6 digit
  this.verificationCode = code;
  this.verificationCodedate = Date.now() + (10 * 60 * 1000) ; //10mins
  return code;
};

export const UserDataSchema = mongoose.model("User",userSchema);
