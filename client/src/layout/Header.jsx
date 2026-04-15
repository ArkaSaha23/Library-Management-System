import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../store/slices/authSlice";

import logo from "../assets/logo.png";

const Header = ({ toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const userInitial = user?.name?.[0]?.toUpperCase() || "U";

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    setOpenMenu(false);
    await dispatch(logout());
    navigate("/Login");
  };

  const handleVisitDashboard = () => {
    setOpenMenu(false);
    navigate("/Dashboard");
  };

  const handleLogin = () => {
    setOpenMenu(false);
    navigate("/Login");
  };

  const handleRegister = () => {
    setOpenMenu(false);
    navigate("/Register");
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-20 bg-white ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-1">

        {/* system logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-lg font-semibold tracking-wide">
            <img className="w-[130px] h-[60px]" src={logo} alt="logo" />
          </span>
        </div>

        <div className="flex items-center">
            <div className="hidden md:flex space-x-8 font-mono text-foreground ml-140">
              <a href="#home" className="font-extrabold">Home</a>
              <a href="#collections" className="font-extrabold">Collections</a>
              <a href="#author" className="font-extrabold">Authors</a>
              <a href="#about" className="font-extrabold">About</a>
            </div>
          </div>

        {/* hamburger menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden rounded-lg bg-gray-100 p-2 text-gray-700 shadow-md transition hover:bg-gray-200"
            aria-label="Open mobile menu"
          >
            <GiHamburgerMenu className="h-6 w-6" />
          </button>
        </div>

        {/* login and register */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogin}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow"
                aria-label="Open account menu"
              >
                {user?.name ? (
                  userInitial
                ) : (
                  <FaUserCircle className="h-6 w-6" />
                )}
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-gray-200 bg-white shadow-lg">
                  <button
                    onClick={handleVisitDashboard}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                  >
                    Visit Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
