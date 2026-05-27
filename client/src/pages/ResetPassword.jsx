import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { RiLockPasswordLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isAuthenticated, message, error } = useSelector(
    (state) => state.authReducer,
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  //Dispatch this data to the resetpassword slice in 'authSlice'
  const handleResetpassword = (e) => {
    e.preventDefault();
    const data = { password, confirmPassword };
    dispatch(resetPassword(data, token));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (isAuthenticated) {
      navigate("/Home");
    }
  }, [message, error, isAuthenticated, dispatch, navigate]);

  return (
    <>
      <div className="min-h-screen flex justify-center bg-gray-100">
        <div className="bg-white p-8 mt-10 rounded-2xl shadow-lg h-full w-full max-w-md">
          <div className="max-w-full flex items-center justify-center">
            <div>
              <img src={logo} alt="logo" className="h-25 w-35" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <RiLockPasswordLine className="text-3xl font mb-6 mr-2" />
            <h2 className="text-3xl font-mono font-bold text-center mb-6">
              Set New Password
            </h2>
          </div>
          <p className="text-center text-gray-700 text-sm font-mono mb-3">
            Please enter your new password below.
          </p>

          <form onSubmit={handleResetpassword} className="space-y-4">
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">
                Create New Password
              </div>
              <input
                type="Password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center px-4 py-2 font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">Confirm Password</div>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Re-Enter The PASSWORD"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-center px-4 py-2 font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 font-mono rounded-lg transition ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
