import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { GrCatalog } from "react-icons/gr";
import { PiBooksFill } from "react-icons/pi";
import { FaUserPen } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

import { logout, resetAuthSlice } from "../store/slices/authSlice";

const SideBar = ({
  isSideBarOpen,
  setSidebar,
  selectedComponent,
  setSelectedComponent,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  const user = useSelector((state) => state.authReducer.user);
  const role = user?.role || "User";

  const handleLogout = async () => {
    setSidebar(false);
    await dispatch(logout());
    navigate("/Login");
  };

  const handleLogin = () => {
    setSidebar(false);
    navigate("/Login");
  };

  const handleRegister = () => {
    setSidebar(false);
    navigate("/Register");
  };

  const handleSelect = (value) => {
    setSelectedComponent(value);
    setSidebar(false);
  };

  const toggleSideBar = () => {
    setSidebar((prev) => !prev);
  };

  const userMenu = [
    {
      type: "button",
      icons: <MdDashboard className="h-4 w-4" />,
      label: "Dashboard",
      action: () => handleSelect("Dashboard"),
    },
    {
      type: "button",
      icons: <GrCatalog className="h-4 w-4" />,
      label: "Catalogs",
      action: () => handleSelect("Catalogs"),
    },
    {
      type: "button",
      icons: <PiBooksFill className="h-4 w-4" />,
      label: "Borrowed Books",
      action: () => handleSelect("MyBorrowedBooks"),
    },
    {
      type: "button",
      icons: <FaUserPen className="h-4 w-4" />,
      label: "Books Management",
      action: () => handleSelect("BooksManagement"),
    },
    {
      type: "button",
      icons: <IoSettings className="h-4 w-4" />,
      label: "Settings",
      action: () => handleSelect("Catalogs"),
    },
  ];
  const AdminMenu = [
    {
      type: "button",
      icons: <MdDashboard className="h-4 w-4" />,
      label: "Dashboard",
      action: () => handleSelect("Dashboard"),
    },
    {
      type: "button",
      icons: <PiBooksFill className="h-4 w-4" />,
      label: "Borrowed Books",
      action: () => handleSelect("MyBorrowedBooks"),
    },
    {
      type: "button",
      icons: <GrCatalog className="h-4 w-4" />,
      label: "Catalogs",
      action: () => handleSelect("Catalogs"),
    },
    {
      type: "button",
      icons: <RiUserSearchFill className="h-4 w-4" />,
      label: "Users",
      action: () => handleSelect("Users"),
    },
    {
      type: "button",
      icons: <MdAdminPanelSettings className="h-4 w-4" />,
      label: "Add New Admin",
      action: () => handleSelect("AddNewAdmin"),
    },
    {
      type: "button",
      icons: <FaUserCog className="h-4 w-4" />,
      label: "Book Management",
      action: () => handleSelect("BooksManagement"),
    },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-0 right-0 left-auto z-30 w-64 overflow-y-auto bg-white shadow-xl transition-transform duration-300 md:relative md:left-0 md:right-auto md:translate-x-0 ${
          isSideBarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-4 md:hidden">
          <span className="text-lg font-bold">Library Menu</span>
          <button
            onClick={toggleSideBar}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="md:hidden h-10/11 px-6 py-6 flex flex-col">
          <div className="mb-4 space-y-2 md:hidden">
            {isAuthenticated &&
              (role === "User" ? (
                <>
                  {userMenu.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className={`flex items-center justify-center w-full rounded-lg mt-3 px-2 py-2 text-md font-mono text-black text-center cursor-pointer transition hover:scale-120 duration-100
                          ${
                            item.label === "Logout"
                              ? "hover:text-red-500"
                              : "hover:text-blue-500"
                          }`}
                    >
                      {item.icons}
                      <span className="ml-1">{item.label}</span>
                    </button>
                  ))}
                </>
              ) : (
                role === "Admin" && (
                  <>
                    {AdminMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`flex items-center justify-center w-full rounded-lg mt-3 px-2 py-2 text-sm font-mono text-black text-center cursor-pointer transition hover:scale-120 duration-100
                          ${
                            item.label === "Logout"
                              ? "hover:text-red-500"
                              : "hover:text-blue-500"
                          }`}
                      >
                        {item.icons}
                        <span className="ml-1">{item.label}</span>
                      </button>
                    ))}
                  </>
                )
              ))}
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center mt-auto w-full rounded-2xl bg-red-500 px-4 py-3 cursor-pointer text-white transiton all duration-300 hover:shadow-2xl hover:shadow-red-600/60 hover:bg-red-800 hover:"
            >
              <IoMdLogOut />
              <span> Logout</span>
            </button>
          )}
        </div>
      </aside>

      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/25 md:hidden"
          onClick={toggleSideBar}
        />
      )}
    </>
  );
};

export default SideBar;
