import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../store/slices/authSlice";

import AboutUs from "./AboutUs";
import Authors from "./Authors";
import Collections from "./Collections";
import HeroSection from "./HeroSection";

import logo from "../assets/logo.png";

const Header = ({ toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  const user = useSelector((state) => state.authReducer.user);

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
    <header className="w-full h-17 fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-5 py-2 sm:py-3">
        {/* system logo */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          <span className="text-lg font-semibold tracking-wide">
            <img
              className="w-30 sm:w-32 h-14 sm:h-15 object-contain"
              src={logo}
              alt="logo"
            />
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center flex-1 justify-center">
          <div className="flex space-x-6 lg:space-x-8 font-mono text-foreground">
            <a
              href="#home"
              className="font-extrabold hover:text-blue-600 transition text-sm lg:text-base"
            >
              Home
            </a>
            <a
              href="#collections"
              className="font-extrabold hover:text-blue-600 transition text-sm lg:text-base"
            >
              Collections
            </a>
            <a
              href="#author"
              className="font-extrabold hover:text-blue-600 transition text-sm lg:text-base"
            >
              Authors
            </a>
            <a
              href="#aboutus"
              className="font-extrabold hover:text-blue-600 transition text-sm lg:text-base"
            >
              About
            </a>
          </div>
        </div>

        {/* Desktop Auth & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger menu for mobile sidebar */}
          <button
            onClick={toggleSidebar}
            className="md:hidden rounded-lg bg-gray-100 p-2 text-gray-700 shadow-md transition hover:bg-gray-200"
            aria-label="Open mobile menu"
          >
            <GiHamburgerMenu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {!isAuthenticated ? (
              <div className="flex items-center gap-3 lg:gap-4">
                <button
                  onClick={handleLogin}
                  className="rounded-lg bg-blue-600 px-3 lg:px-4 py-2 mb-2 text-xs lg:text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="rounded-lg bg-gray-600 px-3 lg:px-4 py-2 mb-2 text-xs lg:text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow transition hover:bg-blue-700"
                  aria-label="Open account menu"
                >
                  {user?.name ? (
                    userInitial
                  ) : (
                    <FaUserCircle className="h-5 w-5 lg:h-6 lg:w-6" />
                  )}
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 rounded-2xl border border-gray-200 bg-white shadow-lg z-50">
                    <button
                      onClick={handleVisitDashboard}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition rounded-t-2xl"
                    >
                      Visit Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-50 transition rounded-b-2xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
