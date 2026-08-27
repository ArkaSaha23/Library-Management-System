import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import { resetAuthSlice, updatePassword } from "../store/slices/authSlice";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { Settings } from "lucide-react";

const SettingPopup = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.authReducer);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      dispatch(toggleSettingPopup());
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("currentPassword",currentPassword);
    formdata.append("newPassword",newPassword);
    formdata.append(" confirmNewPassword", confirmPassword);
    dispatch(updatePassword(formdata));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
      <div className="max-h-[90vh] w-11/12 overflow-y-auto rounded-lg bg-white shadow-lg sm:w-1/2 lg:w-2/5">
        <div className="flex items-center justify-between rounded-t-lg bg-black px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <Settings className="text-2xl" />
            <h2 className="text-lg font-bold">Settings</h2>
          </div>
          <button
            type="button"
            aria-label="Close settings"
            className="cursor-pointer text-xl font-bold text-white"
            onClick={() => dispatch(toggleSettingPopup())}
          >
            <FaWindowClose />
          </button>
        </div>
        <form onSubmit={handleUpdatePassword} className="space-y-2 p-5">
          <div className="pt-1 px-2 text-lg font-bold">Update Password</div>
          <p className="text-center text-sm font-semibold text-gray-700">
            Enter your current password and choose a new password between 8 and 16 characters.
          </p>
      
          <div className="rounded-2xl border border-gray-300 bg-gray-100 px-2 py-3">
            <label
              htmlFor="current-password"
              className="block py-2 text-center font-mono"
            >
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
              className="w-full rounded-lg border px-4 py-2 text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="rounded-2xl border border-gray-300 bg-gray-100 px-2 py-3">
            <label
              htmlFor="new-password"
              className="block py-2 text-center font-mono"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={8}
              maxLength={16}
              required
              className="w-full rounded-lg border px-4 py-2 text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="rounded-2xl border border-gray-300 bg-gray-100 px-2 py-3">
            <label
              htmlFor="confirm-password"
              className="block py-2 text-center font-mono"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              maxLength={16}
              required
              className="w-full rounded-lg border px-4 py-2 text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-mono text-white transition ${loading ? "bg-gray-400" : "bg-blue-500 hover:scale-105 hover:bg-blue-600"}`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingPopup;
