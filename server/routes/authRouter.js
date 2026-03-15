import { Router } from "express";
import {forgotPassword, getUser, login, logout, register,verifyOTP, resetPassword, updatePassword } from "../controllers/authController.js";
 //updatePassword,resetpassword,
import { isAuthenticated } from "../middlewares/authentication.js";
const router=Router();
router.post('/register',register);
router.post('/verifyOTP',verifyOTP);
router.post('/login',login);
router.get('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, getUser);
router.post('/forgotpassword',forgotPassword);
router.put('/resetpassword/:token',resetPassword);
router.put('/updatepassword',isAuthenticated,updatePassword);
export default router;