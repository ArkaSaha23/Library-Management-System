import React, { useState } from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";

import { addNewAdmin } from "../store/slices/userSlice";
const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userReducer.loading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarStatus, setAvatarStatus] = useState("initial");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Example validation
    if (!file.type.startsWith("image/")) {
      setAvatarStatus("failed");
      setAvatarPreview(null);
      setAvatar(null);
      return;
    }

    // Successful selection
    const reader = new FileReader();

    //success upload of img
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatarStatus("success");
    };

    //failed upload of img
    reader.onerror = () => {
      setAvatarStatus("failed");
      setAvatarPreview(null);
      setAvatar(null);
    };

    reader.readAsDataURL(file);
    setAvatar(file);
  };

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    await dispatch(addNewAdmin(formData)); //this will call the userSlice/addNewAdmin function()
    setName("");
    setEmail("");
    setPassword("");
    setAvatar(null);
    setAvatarPreview(null);
    setAvatarStatus("initial");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/35 p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-2xl bg-gray-300 rounded-lg shadow-lg">
          <div className="p-4 sm:p-6">
            {/** Header */}
            <header className="flex justify-center items-center pb-3 border-b">
              <div className="flex justify-center items-center">
                <img
                  className="mr-2 w-8 sm:w-10"
                  src={keyIcon}
                  alt="key-icon"
                />
                <h3 className="text-xl sm:text-2xl font-bold">Add New Admin</h3>
              </div>
            </header>

            {/** Form */}
            <form onSubmit={handleAddNewAdmin} className="space-y-4 mt-4">
              {/**AVATAR SELECTION */}
              <div className="flex justify-center items-center px-3 gap-3">
                <label className="cursor-pointer w-fit">
                  <img
                    className={`w-36 h-36 rounded-full border-4 border-gray-500 object-cover 
                      ${
                        avatarStatus === "initial"
                          ? " border-gray-500"
                          : avatarStatus === "success"
                            ? " border-green-500"
                            : " border-red-500"
                      }`}
                    src={avatarPreview ? avatarPreview : placeHolder}
                    alt="avatar"
                  />
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {/* NAME ENTRY */}
              <div className="flex flex-col sm:flex-row sm:items-center px-3 border border-gray-300 rounded-2xl bg-gray-300 gap-2 sm:gap-0">
                <div className="w-full sm:w-1/5 sm:mr-2 text-sm font-medium">
                  Name
                </div>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Admin's Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-200 text-sm transition-colors duration-300"
                />
              </div>

              {/* EMAIL ENTRY */}
              <div className="flex flex-col sm:flex-row sm:items-center  px-3 border border-gray-300 rounded-2xl bg-gray-300 gap-2 sm:gap-0">
                <div className="w-full sm:w-1/5 sm:mr-2 text-sm font-medium">
                  Email
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Admin's Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-200 text-sm transition-colors duration-300"
                />
              </div>

              {/* PASSWORD ENTRY */}
              <div className="flex flex-col sm:flex-row sm:items-center px-3 border border-gray-300 rounded-2xl bg-gray-300 gap-2 sm:gap-0">
                <div className="w-full sm:w-1/5 sm:mr-2 text-sm font-medium">
                  Password
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Admin's Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-200 text-sm transition-colors duration-300"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full bg-gray-500 text-white font-mono font-extrabold py-2 rounded-lg hover:bg-gray-600 transition duration-300 cursor-pointer"
              >
                {loading ? "Adding..." : "Add Admin"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewAdmin;
//"AddNewAdmin"
