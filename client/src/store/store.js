import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./slices/authSlice.js";
import PopUpReducer from "./slices/popUpSlice.js";
import UserReducer from "./slices/userSlice.js";
export const store = configureStore({
  reducer:{
    authReducer : AuthReducer,
    popUpReducer : PopUpReducer,
    userReducer: UserReducer,
  },
});