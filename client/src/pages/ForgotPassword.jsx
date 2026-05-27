import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, message, loading, isAuthenticated, error } = useSelector(
    (state) => state.authReducer,
  );

  const [email, setEmail] = useState("");

  const handleForgetPassword = (e) => {
    e.preventDefault();
    dispatch(forgetPassword({email}));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/Login");
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch, navigate]);

  return (
    <>
      <div className="w-full p-3 bg-gray-100 flex justify-between">
        <button
          className="mt-3 px-5 py-2 border-2 border-gray-700 rounded-2xl font-mono text-md bg-white hover:bg-gray-900 hover:text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          ← Back to Home Screen
        </button>
        <button
          className="mt-3 px-5 border-2 border-gray-700 rounded-2xl font-mono text-md bg-white hover:bg-gray-900 hover:text-white cursor-pointer"
          onClick={() => navigate("/Login")}
        >
          Login →
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="max-w-full flex items-center justify-center">
            <div>
              <img src={logo} alt="logo" className="h-25 w-35" />
            </div>
          </div>
          <div className="text-center text-gray-700 text-sm font-mono mb-3">
            <span>Please enter your Registered Email address.</span>
            <br />
            <span>Check your Mail box to Reset your Password.</span>
          </div>
          <h2 className="text-xl font-mono font-bold text-center mb-3">
            Enter Your Email
          </h2>

          <form onSubmit={handleForgetPassword} className="text-center">
            <div className="mb-5 py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100 ">
              <input
                type="email"
                name="email"
                value={email}
                placeholder="EMAIL-ID"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-center text-md font-mono  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-2/3 text-white py-2 font-mono rounded-lg transition ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
            >
              {loading ? "Submiting..." : "Reset Your Password"}
            </button>
          </form>

          {/* IF THE USER ALREADY HAVE AN ACCOUNT PREVIOUSLY */}
          <div className="max-w-full h-10 flex justify-content items-center mt-3">
            <div className="w-1/2 max-h-full">
              <p className="text-end font-mono mt-6 text-sm">
                Registered User?{" "}
                <span
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => navigate("/Register")}
                >
                  Login
                </span>
              </p>
            </div>

            <div className="w-1/2 max-h-full">
              <p className="text-end font-mono mt-6 text-sm">
                New User?{" "}
                <span
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => navigate("/Register")}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
