import React, { useEffect, useState } from "react";
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

const App = () => {
  const [isSideBarOpen, setSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");

  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());

    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllUsers());
      console.log("the Logged in user is an admin");
    }
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home
                  isSideBarOpen={isSideBarOpen}
                  setSidebar={setSidebar}
                  selectedComponent={selectedComponent}
                  setSelectedComponent={setSelectedComponent}
                />
              ) : (
                <Login />
              )
              // <Home
              //   isSideBarOpen={isSideBarOpen}
              //   setSidebar={setSidebar}
              //   selectedComponent={selectedComponent}
              //   setSelectedComponent={setSelectedComponent}
              // />
            }
          />
          <Route
            path="/Home"
            element={
              <Home
                isSideBarOpen={isSideBarOpen}
                setSidebar={setSidebar}
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
              />
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          <Route path="/OTPverification/:email" element={<OTPverification />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
        </Routes>
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </>
  );
};

export default App;
