import { Router } from "express";
import { register,verifyOTP } from "../controllers/authController.js";
const router=Router();
router.post('/register',register);
router.post('/verifyOTP',verifyOTP);
export default router;