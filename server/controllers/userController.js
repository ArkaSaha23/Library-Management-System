import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { UserDataSchema } from "../models/userModels.js";
// import { cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import pkg from 'cloudinary';
const { v2:cloudinary } = pkg;

//get all the registeresd user//ADMIN
export const getallUsers = catchAsyncErrors(async (req, res, next) => {
  const alluser = await UserDataSchema.find({
    role: "User",
    accountVerified: true,
  });
  res.status(200).json({
    success: true,
    message: "List of all the Users",
    alluser,
  });
});

//register a New Admin
export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
  //check if admins profile pic is provided or not
  if (!req.files?.avatar) {
    return next(new ErrorHandler("Profile Picture for Admin i Required", 400));
  }
  //check if all the fields are entered
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("please provide all the fields", 400));
  }

  //check if the email entered is already an admin
  const isRegistered = await UserDataSchema.findOne({
    email,
    accountVerified: true,
    role: "Admin",
  });
  if (isRegistered) {
    return next(new ErrorHandler("Admin Already Registered", 400));
  }

  //password check
  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Passowrd must be between 8 and 16 characters", 400),
    );
  }

  const { avatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(new ErrorHandler("File Format not supported", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    {
      folder: "LIBRARY_MANAGEMENT_SYSTEM_AVATARS",
    },
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary Error:",
      cloudinaryResponse.error || "Unknown cloudinary error.",
    );
    return next(new ErrorHandler("failed to upload profile picture", 500));
  }
  const admin = await UserDataSchema.create({
    name,
    email,
    password: hashedPassword,
    role : "Admin",
    accountVerified:true,
    avatar:{
      publicID:cloudinaryResponse.public_id,
      url:cloudinaryResponse.secure_url,
    }
  });
  res.status(201).json({
    success:true,
    message:"Admin registered successfully",
    admin,
  });
});
