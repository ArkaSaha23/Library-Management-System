import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LandingPage from "./Home/LandingPage";
import Login from "./pages/Login";
import OTPverification from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";

//react toastify : beautifull design Alert message popup
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import { getAllBooks } from "./store/slices/bookSlice";

const App = () => {
  const {isAuthenticated } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"                       element={isAuthenticated ? <Home /> : <Login />}/>
          <Route path="/Home"                   element={<Home />} />
          <Route path="/Login"                  element={<Login />} />
          <Route path="/Register"               element={<Register />} />
          <Route path="/ResetPassword/:token"   element={<ResetPassword />} />
          <Route path="/OTPverification/:email" element={<OTPverification />} />
          <Route path="/ForgotPassword"         element={<ForgotPassword />} />
          <Route path="/UpdatePassword"         element={<UpdatePassword />} />
        </Routes>
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </>
  );
};

export default App;
