import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import logo from "../assets/logo.png";

import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { logout } from "../store/slices/authSlice";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiUserSearchFill } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";

const MainHeader = ({ toggleSidebar, selectedComponent,setSelectedComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user,isAuthenticated} = useSelector((state) => state.authReducer);
  const authInitialized = useSelector((state) => state.authReducer.initialized);
  const role = user?.role || "User";

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/Login");
  };

  const handleSelect = (value) => {
    setSelectedComponent(value);
  };

  const userMenu = [
    {
      type: "button",
      icons: <MdDashboard className="h-4 w-4" />,
      label: "Dashboard",
      component : "Dashboard",
      action: () => handleSelect("Dashboard"),
    },
    // {
    //   type: "button",
    //   icons: <GrCatalog className="h-4 w-4" />,
    //   label: "Catalogs",
    //   component : "Catalogs",
    //   action: () => handleSelect("Catalogs"),
    // },
    {
      type: "button",
      icons: <IoBookSharp className="h-4 w-4" />,
      label: "Borrowed Books",
      component : "BorrowedBooks",
      action: () => handleSelect("BorrowedBooks"),
    },
    {
      type: "button",
      icons: <GiBookshelf className="h-4 w-4" />,
      label: "List of Books",
      component : "BooksManagement",
      action: () => handleSelect("BooksManagement"),
    },
    {
      type: "button",
      icons: <IoMdLogOut className="h-4 w-4" />,
      label: "Logout",
      action: () => handleLogout(),
    },
  ];
  const AdminMenu = [
    {
      type: "button",
      icons: <MdDashboard className="h-4 w-4" />,
      label: "Dashboard",
      component : "Dashboard",
      action: () => handleSelect("Dashboard"),
    },
    {
      type: "button",
      icons: <IoBookSharp className="h-4 w-4" />,
      label: "Borrowing Management",
      component : "BorrowingManagement",
      action: () => handleSelect("BorrowingManagement"),
    },
    {
      type: "button",
      icons: <RiUserSearchFill className="h-4 w-4" />,
      label: "Users",
      component : "Users",
      action: () => handleSelect("Users"),
    },
    {
      type: "button",
      icons: <MdAdminPanelSettings className="h-4 w-4" />,
      label: "Add New Admin",
      component : "AddNewAdmin",
      action: () => handleSelect("AddNewAdmin"),
    },
    {
      type: "button",
      icons: <GiBookshelf className="h-4 w-4" />,
      label: "Books Management",
      component : "BooksManagement",
      action: () => handleSelect("BooksManagement"),
    },
    {
      type: "button",
      icons: <IoMdLogOut className="h-4 w-4" />,
      label: "Logout",
      action: () => handleLogout(),
    },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 border-b border-blue-100 bg-gray-100 shadow-md">
        <div className="mx-auto flex w-full items-center gap-2 px-2 py-2 sm:px-3 md:px-4 lg:px-6">
          {/* left side logo */}
          <div
            className="flex shrink-0 items-center justify-start lg:w-auto"
            onClick={() => navigate("/")}
          >
            <img
              className=" cursor-pointer h-12 w-auto object-contain sm:h-14 md:h-16"
              src={logo}
              alt="logo"
            />
          </div>

          {/* right side.....notification icon,rest component*/}
          {!authInitialized ? null : !isAuthenticated ? (
            <Navigate to="/Login" />
          ) : (
            <>
              {role == "User" && (
                <>
                  <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:gap-5 lg:gap-7 md:flex md:flex-wrap">
                    {userMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`inline-flex items-center justify-center rounded-lg px-2 py-2 text-[10px] font-mono text-black transition duration-100 hover:scale-110 whitespace-nowrap md:text-xs lg:text-sm
                          ${item.label === "Logout" ? "hover:text-red-500" : "hover:text-blue-400"} 
                          ${selectedComponent === item.component ? "text-blue-600 scale-130 border border-blue-400 bg-blue-100 rounded-xl" : "text-black"}`}
                      >
                        {item.icons}
                        <span className="ml-1">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="ml-auto flex items-center justify-end md:hidden">
                    <button
                      className="flex items-center justify-end rounded-xl p-2"
                      onClick={toggleSidebar}
                    >
                      <GiHamburgerMenu className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </>
              )}
              {role == "Admin" && (
                <>
                  <div className="hidden md:flex flex-1 min-w-0 items-center justify-center md:flex-wrap gap-1 md:gap-5 lg:gap-7">
                    {AdminMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`inline-flex items-center justify-center rounded-lg px-2 py-2 text-[10px] font-mono text-black transition duration-100 hover:scale-110 whitespace-nowrap md:text-xs lg:text-sm
                          ${item.label === "Logout" ? "hover:text-red-500" : "hover:text-blue-500"
                          } ${selectedComponent === item.component ? "text-blue-600 scale-120 border border-blue-400 bg-blue-100 rounded-xl" : "text-black"}`}
                      >
                        {item.icons}
                        <span className="ml-1">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="ml-auto flex items-center justify-center md:hidden">
                    <button
                      className="flex items-center justify-center rounded-xl p-2"
                      onClick={toggleSidebar}
                    >
                      <GiHamburgerMenu className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          <div className="flex shrink-0 items-center justify-end lg:w-48 lg:mr-2">
            <div className="flex items-center justify-end gap-2 sm:gap-3">
               {/* User Icon */}
                  <FaUser className="h-6 w-5 sm:h-10 sm:w-10 text-blue-500 shrink-0" />
 
               {/* User Details */}
              <div className="sm:block">
                <h2 className="text-md md:text-2xl font-mono font-bold text-blue-700 truncate">
                     {user?.name}
                </h2>

                <h4 className="ml-1 text-xs sm:text-sm font-mono font-bold  text-blue-500">
                {user?.role}
                </h4>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* BELOW HEADER
      <header className="absolute mt-20 h-60 w-full py-4 px-6 left-0  flex justify-center items-center z-14">
        <div className=" bg-white h-full w-11/12 gap-40 flex justify-center items-center shadow-md rounded-4xl">
          <div className=" flex items-center gap-2">
            <img src="" alt="userIcon" className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-sm font-medium sm:text-lg sm:font-medium">
                {user && user.name}
              </span>
              <span>{user && user.role}</span>
            </div>
          </div>
          {/*Right side
          <div className="hidden md:flex items-center gap-2">
            <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
              <span>{currentDate}</span>
              <br></br>
              <span>{currentTime}</span>
            </div>
            <span className="bg-black h-14 w-[2px]" />
            <img
              src=""
              alt="Setting Icon"
              className="w-8 h-8"
              onClick={() => toggleSettingPopup}
            />
          </div>
        </div>
      </header> */}
    </>
  );
};

export default MainHeader;
