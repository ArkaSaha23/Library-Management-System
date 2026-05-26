import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Header from "../layout/Header";
import SideBar from "../layout/SideBar";

import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.error);
  const message = useSelector((state) => state.authReducer.message);
  const user = useSelector((state) => state.authReducer.user);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated,
  );

  const handleRegister = (e) => {
    e.preventDefault(); //It prevents the page from gettimng reoad or getting refreshed
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data)); //will dispatch data in the authSlice register func()
  };

  //if the user successfully registers he will get navigate to OTP verifiaction Page ////
  // otherwise error will be thrown
  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate(`/OTPverification/${email}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, navigate, dispatch, isAuthenticated, loading]);

  //if the user is already authenticated he will not get redirected here
  if (isAuthenticated === true) {
    return <Navigate to="/Home" />;
  }

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
        <div className="bg-white p-8 mt-10 rounded-2xl shadow-lg h-full w-full max-w-md">
          {/* LOGO */}
          <div className="max-w-full flex items-center justify-center">
            <div>
              <img src={logo} alt="logo" className="h-25 w-35" />
            </div>
          </div>

          {/* HEADING */}
          <h2 className="text-3xl font-mono font-bold text-center mb-6">
            Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* NAME ENTRY */}
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">Enter your Name</div>
              <input
                type="text"
                name="name"
                placeholder="FULL NAME"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 hover:bg-gray-200 font-mono"
              />
            </div>

            {/* EMAIL ENTRY */}
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">Enter your Email</div>
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 hover:bg-gray-200 font-mono"
              />
            </div>

            {/* PASSWORD ENTRY */}
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">
                Enter your Password
              </div>
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400  hover:bg-gray-200 font-mono"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-mono font-extrabold py-2 rounded-lg hover:bg-green-600 transition hover:"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>

          {/* IF THE USER ALREADY HAVE AN ACCOUNT PREVIOUSLY */}
          <p className="text-center font-mono mt-4 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer font-mono text-md hover:text-blue-700"
              onClick={() => navigate("/Login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
