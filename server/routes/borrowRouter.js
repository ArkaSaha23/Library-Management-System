import { borrowBook,getAllBorrowedBooks, getBorrowedBookByuser, renewBook, returnBook, seeBorrowedBook } from "../controllers/borrowController.js";
import {Router} from "express";
import { isAuthenticated, isAuthorised } from "../middlewares/authentication.js";
const router = Router();

router.post("/borrowBook/:id",isAuthenticated,isAuthorised("Admin", "User"),borrowBook);

router.put("/returnBook/:id",isAuthenticated,isAuthorised("Admin", "User"),returnBook);

router.put("/renewBook/:id",isAuthenticated,isAuthorised("Admin", "User"),renewBook);

router.get("/getAllBorrowedBooks",isAuthenticated,isAuthorised("Admin"),getAllBorrowedBooks);

router.get("/getBorrowedBooksByUser",isAuthenticated,isAuthorised("Admin"),getBorrowedBookByuser);

router.get("/seeBorrowedBooks",isAuthenticated,isAuthorised("Admin","User"),seeBorrowedBook);

export default router;