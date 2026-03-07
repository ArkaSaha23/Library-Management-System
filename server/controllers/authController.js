import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, {
  errorMiddleware,
} from "../middlewares/errorMiddleware.js";
import { UserDataSchema } from "../models/userModels.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationCode } from "../utils/sendverificationCode.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    //if the user didnt entered all the required fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return new ErrorHandler("Please Enter all the fields", 400);
    }

    //already a registerred user
    const isregistered = await User.findOne({ email, accountVerified: true });
    if (isregistered) {
      return new ErrorHandler("User already exist", 400);
    }

    //if the user has constantly registering but coundn't verify the account then 
    const registrationAttemptsCount = await User.find({
      email,
      accountVerified: false,
    });
    if (registrationAttemptsCount > 5) {
      return new ErrorHandler(
        "You have attempted more than 5 times.Please try after 30mins",
        400,
      );
    }
    //invalid password
    if(password.length >= 8 && password.length <= 16 )
    {
      return (new ErrorHandler("Incorrect Password! Password must be Between 8 and 16 character",400));
    }
    //New User
    const hashedPassword = await bcrypt.hash(password,10);
    const userdata=await User.create({
      name,email,password:hashedPassword,
    })

    const verificationCode=await userdata.generateVerificationCode();
    await userdata.save();
    sendVerificationCode(verificationCode,email,res);
  } catch (error) {
    next(error);
  }
}); //it will call the catchAsync() function and will pass "async(req,res,next)=>{}"" as parameter
