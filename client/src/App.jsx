import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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

const App = () => {
  const {isAuthenticated,initialized } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  console.log(isAuthenticated);

   if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-600">
          Checking Authentication...
        </p>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"                       element={isAuthenticated ? <Home /> : <Login />}/>
          <Route path="/Home"                   element={isAuthenticated ? <Home /> : <Navigate to="/Login" replace/>} />
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
