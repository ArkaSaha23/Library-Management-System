import express, { urlencoded } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
export const app = express();
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";
import expressFileupload from "express-fileupload";
import {
  notifyUsersAfterDueDate,
  notifyUsersOneDayAgo,
} from "./services/notifyUsers.js";

//we have to set up the path of config.env file in app.js..it loads the environment variables from config.env

config({ path: "./config/config.env" });

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//CORS=Cross origin resource sharing
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser()); //Reads cookies from client request.
app.use(express.json()); //Allows Express to read JSON data from request body
app.use(express.urlencoded({ extended: true })); //Reads form data submitted from HTML forms.

app.use(
  expressFileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);
notifyUsersOneDayAgo();
notifyUsersAfterDueDate();

connectDB();

app.use(errorMiddleware);
