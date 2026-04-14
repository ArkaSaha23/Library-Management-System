import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { UserDataSchema } from "../models/userModels.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationCode } from "../utils/sendverificationCode.js";
import { sendTokens } from "../utils/sendTokens.js";
import { sendEmail } from "../utils/sendEmail.js";
import { ForgetPasswordEmailTemplate } from "../utils/ForgetPasswardEmailTemplate.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Case 1: if the user didnt entered all the required fields
    if (!name || !email || !password) {
      return next(new ErrorHandler("Please Enter all the fields", 400));
    }

    //Case 2: already a registerred user
    const isregistered = await UserDataSchema.findOne({
      email,
      accountVerified: true,
    });
    if (isregistered) {
      return next(new ErrorHandler("User already exist", 400));
    }

    //Case 3: if the user has constantly registering but coundn't verify the account then
    const registrationAttemptsCount = await UserDataSchema.find({
      email,
      accountVerified: false,
    });
    if (registrationAttemptsCount.length > 5) {
      return next(
        new ErrorHandler(
          "You have attempted more than 5 times.Please try after 30mins",
          400,
        ),
      );
    }
    //Case 4: invalid password
    if (password.length < 8 || password.length > 16) {
      return next(
        new ErrorHandler(
          "Incorrect Password! Password must be Between 8 and 16 character",
          400,
        ),
      );
    }
    //case 5: New User
    const hashedPassword = await bcrypt.hash(password, 10);
    const userdata = await UserDataSchema.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationCode = await userdata.generateVerificationCode();
    await userdata.save();
    await sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    next(error);
  }
}); //it will call the catchAsync() function and will pass "async(req,res,next)=>{}"" as parameter

export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, OTP } = req.body;

    //email or otp is missing
    if (!email || !OTP) {
      return next(new ErrorHandler("Email or OTP is missing", 400));
    }

    //finding the correct email
    const userAllEntries = await UserDataSchema.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    if (userAllEntries.length === 0) {
      return next(new ErrorHandler("User not found!!!", 404));
    }

    //getting the lastest entry of that user who tried to login many times and deleting rest
    let curUser;
    if (userAllEntries.length > 1) {
      curUser = userAllEntries[0];
      await UserDataSchema.deleteMany({
        _id: { $ne: curUser._id }, //"_id" is the field and "ne" is the "not equal"  operator
        email,
        accountVerified: false,
      });
    } else {
      curUser = userAllEntries[0];
    }

    //If verification code of the user is not same as OTP
    if (curUser.verificationCode !== Number(OTP)) {
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    //If verification Time exceeded,OTP expired
    const currentTime = Date.now();
    const verificationCodeExpireTime = new Date(
      curUser.verificationCodeExpire,
    ).getTime();
    if (currentTime > verificationCodeExpireTime) {
      return next(new ErrorHandler("OTP Expired", 400));
    }

    // OTP correct and not expired
    curUser.accountVerified = true;
    curUser.verificationCode = null;
    curUser.verificationCodeExpire = null;
    await curUser.save({ validateModifiedOnly: true });

    sendTokens(curUser, 200, "Account Verified", res);
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //if email or password is not provided by user
    if (!email || !password) {
      return next(new ErrorHandler("Fields are incomplete", 400));
    }

    //find the user from database using email,
    const curUser = await UserDataSchema.findOne({
      email,
      accountVerified: true,
    }).select("+password");
    if (!curUser) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    //compare the entered password with the user password
    const isMatch = await bcrypt.compare(password, curUser.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Password", 400));
    }
    sendTokens(curUser, 200, "Login Successfull", res);
  } catch (err) {
    next(new ErrorHandler("Internal server error", 500));
  }
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(new ErrorHandler("Internal server error", 500));
  }
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  //in authentication.js we used req.user=storing the user details using findById,so store it to curUser
  const curUser = req.user;
  res.status(200).json({
    success: true,
    curUser,
  });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }
  //find the user who forgot password
  const curUser = await UserDataSchema.findOne({
    email,
    accountVerified: true,
  });
  if (!curUser) {
    return next(new ErrorHandler("Invalid email", 400));
  }
  try {
    const resetToken = curUser.generatePasswordResetToken(); //get original token

    await curUser.save({ validateModifiedOnly: true });

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`; //Now the system prepares a link that will be emailed to the user:

    const message = ForgetPasswordEmailTemplate(resetUrl);

    await sendEmail({
      email: curUser.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (err) {
    curUser.resetPasswordExpire = undefined;
    curUser.resetPasswordToken = undefined;
    await curUser.save({ validateModifiedOnly: false });
    return next(new ErrorHandler(err.message, 500));
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.params; //from the url path,Whatever appears in this position of the URL, capture it and store it in req.params
    const { password, confirmPassword } = req.body;

    // hash the token coming from the URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // find a user with that token and ensure it has not expired,findOne(condition)
    const curUser = await UserDataSchema.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!curUser) {
      return next(new ErrorHandler("Reset token is invalid or expired", 400));
    }

    if (password.length < 8 || password.length > 16) {
      return next(
        new ErrorHandler(
          "Incorrect Password! Password must be Between 8 and 16 character",
          400,
        ),
      );
    }

    if (password != confirmPassword) {
      return next(
        new ErrorHandler("Password and Confirm Password do not match", 400),
      );
    }
    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update password and clear reset fields
    curUser.password = hashedPassword;
    curUser.resetPasswordToken = undefined;
    curUser.resetPasswordExpire = undefined;

    await curUser.save();

    // optional: automatically log the current user in
    sendTokens(curUser, 200, "Password reset successful", res);
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    //const curUser = await UserDataSchema.findById(req.user._id); 
    //we have already get the user from "req.user._id" from isAuthentication
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return next(new ErrorHandler("Please Enter all the Fields",400));
    }

    const curUser = await UserDataSchema.findById(req.user._id).select("+password");
    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      curUser.password,
    );

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Wrong Password!!!", 400));
    }
    if (newPassword.length < 8 || newPassword.length > 16) {
      return next(
        new ErrorHandler(
          "Incorrect Password! Password must be Between 8 and 16 character",
          400,
        ),
      );
    }

    if (newPassword != confirmNewPassword) {
      return next(
        new ErrorHandler(
          "New Password and Confirm New Password do not match",
          400,
        ),
      );
    }
    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password and clear reset fields
    curUser.password = hashedPassword;
    await curUser.save();
    res.status(200).json({
      success: true,
      message: "Password Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});
