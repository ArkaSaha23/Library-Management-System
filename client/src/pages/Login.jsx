import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";

import logo from "../assets/logo.png";
import { IoMdLogIn } from "react-icons/io";

import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, loading, error, user, message } = useSelector(
    (state) => state.authReducer,
  );

  const handleLogin = (e) => {
    e.preventDefault(); //It prevents the page from gettimng reoad or getting refreshed
    dispatch(login({ email, password })); //will dispatch data in the authSlice lpgin func()
  };

  useEffect(() => {
    if (message) {
      toast.success(message); //successful login toast will sent a successful Loginmessage
      dispatch(resetAuthSlice()); //reset the Loading,message,error authStates
      navigate("/Home"); //Navigate to HomePage
    }
    if (error) {
      toast.error(error); //Unsuccessful login toast will sent a Error unsuccessful Login message
      dispatch(resetAuthSlice()); //reset the Loading,message,error authStates
    }
  }, [message, error, navigate, dispatch, isAuthenticated, loading]);

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
          onClick={() => navigate("/Register")}
        >
          Register →
        </button>
      </div>

      <div className="min-h-screen flex justify-center bg-gray-100">
        <div className="bg-white p-8 mt-10 rounded-2xl shadow-lg h-full w-full max-w-md">
          <div className="max-w-full flex items-center justify-center">
            <div>
              <img src={logo} alt="logo" className="h-25 w-35" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <IoMdLogIn className="text-3xl font mb-5 mr-2" />
            <h2 className="text-3xl font-mono font-bold text-center mb-6">
              Login
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">Enter your Email</div>
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">
                Enter your Password
              </div>
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 font-mono rounded-lg transition ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="max-w-full h-10 flex justify-content items-center">
            <div className="w-1/3 max-h-full">
              <p
                className="text-center font-mono mt-6 text-sm cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() => navigate("/ForgotPassword")}
              >
                Forget Password
              </p>
            </div>
            <div className="w-2/3 max-h-full">
              <p className="text-end font-mono mt-6 text-sm">
                Don't have an account?{" "}
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

export default Login;
