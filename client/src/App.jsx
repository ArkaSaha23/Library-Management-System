import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LandingPage from "./Home/LandingPage";
import Login from "./pages/Login";
import OTPverification from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";

//react toastify : beautifull design Alert message popup
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isSideBarOpen, setSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isSideBarOpen={isSideBarOpen}
                setSidebar={setSidebar}
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
              />
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
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/OTPverification/:email" element={<OTPverification />} /> 
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </>
  );
};

export default App;
