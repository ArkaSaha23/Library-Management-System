import jwt from "jsonwebtoken";
import { UserDataSchema } from "../models/userModels.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return next(new ErrorHandler("User is not authenticated", 400));
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(verify);
  
  req.user = await UserDataSchema.findById(verify.id); //we are fetching req,user from here already so in authorization we dont need to do it again
  next();
});

export const isAuthorised = (...roles)=>{   //role : ["Admin", "User"]
  return(
    (req,res,next)=>{
      const user=req.user;
      if(!roles.includes(req.user.role)){
        return res.status(403).json({
          success:false,
          message:"Not Allowed",
        })
      }
      next();
    }
  )
};