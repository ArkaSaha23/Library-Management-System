import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { MdAttachEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OTPverification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams(); //we will get the email from the URL in App.jsx

  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error, user, message } = useSelector(
    (state) => state.authReducer,
  );

  const handleOTPVerify = (e) => {
    e.preventDefault();
    dispatch(OTPverification({ email, OTP: otp })); //This will dispatch the OTPverification function in the authSlice
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
  }, [message, error, navigate, dispatch, isAuthenticated, loading]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Home");
    }
  }, [isAuthenticated, navigate]);

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
          <div className="text-center text-gray-700 text-md font-mono mb-3">
            <span>We have sent an OTP to your Email.</span>
            <br />
            <span>Please Check your MailBox</span>
          </div>

          <div className="flex justify-center items-center">
            <MdAttachEmail className="text-3xl font mb-2 mr-2" />
            <h2 className="text-3xl font-mono font-bold text-center mb-3">
              Verify Your OTP
            </h2>
          </div>

          <form onSubmit={handleOTPVerify} className="text-center">
            <div className="mb-5 py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100 ">
              <input
                type="text"
                inputMode="numeric" // Triggers numeric keypad on iOS and Android
                pattern="[0-9]*" // Fallback for older browsers to show number pad
                autoComplete="one-time-code"
                value={otp}
                maxLength={6}
                placeholder="******"
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 tracking-[0.6em] pl-[0.6em] text-center text-3xl font-mono  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-2/3 text-white py-2 font-mono rounded-lg transition ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
            >
              {loading ? "verifying..." : "Submit"}
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

export default OTP;
