import express from "express";
import {
  getallUsers,
  registerNewAdmin,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthorised } from "../middlewares/authentication.js";

const router = express.Router();

router.get("/getAllUsers", isAuthenticated, isAuthorised("Admin"), getallUsers);

router.post(
  "/RegisterNewAdmin",
  isAuthenticated,
  isAuthorised("Admin"),
  registerNewAdmin,
);

export default router;
