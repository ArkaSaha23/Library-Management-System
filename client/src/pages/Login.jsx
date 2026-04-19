import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../layout/Header";
import SideBar from "../layout/SideBar";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";

import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.authReducer,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    navigate("/Home");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Home");
    }
  }, [isAuthenticated]);

  const handleRegister = () => {
    navigate("/Register");
  };

  const ForgetPassword = () => {
    navigate("/forgetPassword");
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="max-w-full flex items-center justify-center">
            <div>
              <img src={logo} alt="logo" className="h-25 w-35" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          <div className="max-w-full h-10 flex justify-content items-center">
            <div className="w-1/3 max-h-full">
              <p
                className="text-center mt-6 text-sm cursor-pointer text-blue-500"
                onClick={ForgetPassword}
              >
                Forget Password
              </p>
            </div>
            <div className="w-2/3 max-h-full">
              <p className="text-end mt-6 text-sm">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handleRegister}
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
