import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice.js";
export const store = configureStore({
  reducer:{
    auth : AuthReducer,
  },
});