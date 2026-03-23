import { Router } from "express";
import {
  isAuthenticated,
  isAuthorised,
} from "../middlewares/authentication.js";
import {
  addBook,
  getAllBook,
  deleteBook,
  updateBook,
} from "../controllers/BookController.js";
//import { Router } from "express";

const router = Router();

router.post("/admin/addBook", isAuthenticated, isAuthorised("Admin"), addBook);

router.get("/getAllBook", isAuthenticated, getAllBook);

router.patch(
  "/admin/updateBook/:id",
  isAuthenticated,
  isAuthorised("Admin"),
  updateBook,
);

router.delete(
  "/admin/deleteBook/:id",
  isAuthenticated,
  isAuthorised("Admin"),
  deleteBook,
);

export default router;
