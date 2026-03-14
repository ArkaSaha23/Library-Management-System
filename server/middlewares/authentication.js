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
  
  req.user = await UserDataSchema.findById(verify.id);
  next();
});