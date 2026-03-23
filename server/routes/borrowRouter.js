import { borrowBook, getBorrowedBookByuser } from "../controllers/borrowController.js";
import {Router} from "express";
import { isAuthenticated, isAuthorised } from "../middlewares/authentication.js";
const router = Router();

router.post("/borrowBook/:id",isAuthenticated,isAuthorised("Admin", "User"),borrowBook);
router.get("/getBorrowedBookByuser/:id",isAuthenticated,isAuthorised("Admin"),getBorrowedBookByuser);

export default router;