import express, { urlencoded } from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
export const app=express();
import cors from "cors";
import {connectDB} from './database/db.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

//we have to set up the path of config.env file in app.js..it loads the environment variables from config.env
config({path:"./config/config.env"});

//CORS=Cross origin resource sharing
app.use(
  cors(
    {
      origin:[process.env.FRONTEND_URL],
      methods:["GET","POST","PUT","DELETE"],
      credentials:true,
    }
))
app.use(cookieParser());//Reads cookies from client request.
app.use(express.json());//Allows Express to read JSON data from request body
app.use(express.urlencoded({extended:true}));//Reads form data submitted from HTML forms.
connectDB();


app.use(errorMiddleware);