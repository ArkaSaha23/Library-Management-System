import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { RiLockPasswordLine } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPassword,
  resetAuthSlice,
  updatePassword,
} from "../store/slices/authSlice";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, message, loading, isAuthenticated, error } = useSelector(
    (state) => state.authReducer,
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const data = { currentPassword, newPassword, confirmPassword };
    dispatch(updatePassword(data));
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
  }, [message, isAuthenticated, error, dispatch, navigate]);

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
          onClick={() => navigate("/Home")}
        >
          Back to Your Profile →
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="m-5 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="max-w-full flex items-center justify-center">
            <div>
              <img src={logo} alt="logo" className="h-25 w-35" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <RiLockPasswordLine className="text-3xl font mb-6 mr-2" />
            <h2 className="text-3xl font-mono font-bold text-center mb-6">
              Password Update
            </h2>
          </div>
          <div className="text-center text-gray-700 text-sm font-mono mb-3">
            <span>Please enter these details to update your password.</span>
            <br />
            <span>
              The New Password should be of length between 8 and 16 characters.
            </span>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">
                Enter Current Password
              </div>
              <input
                type="Password"
                name="current password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full text-center px-4 py-2 font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">
                Create New Password
              </div>
              <input
                type="Password"
                name="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full text-center px-4 py-2 font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">Confirm Password</div>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Re-Enter The Password"
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
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
