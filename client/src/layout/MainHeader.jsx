import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import logo from "../assets/logo.png";

import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { logout } from "../store/slices/authSlice";

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
import { IoIosNotifications } from "react-icons/io";

const MainHeader = ({ toggleSidebar, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentTime, SetCurrentTime] = useState("");
  const [currentDate, SetCurrentDate] = useState("");

  const user = useSelector((state) => state.authReducer.user);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated,
  );
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
      action: () => handleSelect("BorrowedBooks"),
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
      label: "Books Management",
      action: () => handleSelect("BooksManagement"),
    },
    {
      type: "button",
      icons: <IoMdLogOut className="h-4 w-4" />,
      label: "Logout",
      action: () => handleLogout(),
    },
  ];

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      //time
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "p.m." : "a.m.";

      SetCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);

      //date
      const curDate = {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      SetCurrentDate(now.toLocaleDateString("en-IN", curDate));
    };
    updateDateTime(); //will run once immediately
    const intervalID = setInterval(updateDateTime, 1000); //after every 1 sec this function will run
    return () => clearInterval(intervalID); //
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 bg-gray-100 shadow-md">
        <div className="mx-auto flex w-full items-center justify-between gap-2 px-2 py-2 sm:px-3 md:px-4 lg:px-6">
          {/* left side logo */}
          <div
            className="flex shrink-0 items-center"
            onClick={() => navigate("/")}
          >
            <img
              className=" cursor-pointer h-12 w-auto object-contain sm:h-14 md:h-16"
              src={logo}
              alt="logo"
            />
            {/* <div className="hidden ml-10 h-10 w-12 border bg-yellow-100 rounded-l-sm md:flex justify-center items-center">
              <FaMagnifyingGlass className="h-5 w-5 text-gray-600" />
            </div> */}
          </div>

          {/* center section...search bar */}
          <div className="w-full md:w-80 lg:w-120 flex justify-center items-center">
            <div className="bg-gray-100 w-full h-10 flex justify-center items-center">
              {/* search icon */}
              <div className="h-10 w-12 border bg-yellow-100 rounded-l-sm flex justify-center items-center">
                <FaMagnifyingGlass className="h-5 w-5 text-gray-600" />
              </div>

              {/* search bar */}
              <input
                className="bg-gray-100 w-full h-10 border-gray-700 border rounded-r-lg font-medium text-xs p-2"
                type="text"
                placeholder="Search Books,Authors,Catalogs"
              />
            </div>
          </div>

          {/* right side.....notification icon,rest component*/}
          {!authInitialized ? null : !isAuthenticated ? (
            <Navigate to="/Login" />
          ) : (
            <>
              {role == "User" && (
                <>
                  <div className="hidden md:flex md:flex-wrap md:items-center md:justify-end md:gap-1 lg:gap-2">
                    {userMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`inline-flex items-center justify-center rounded-lg px-2 py-2 text-[10px] font-mono text-black transition duration-100 hover:scale-105 whitespace-nowrap md:text-xs lg:text-sm
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
              {role == "Admin" && (
                <>
                  <div className="hidden md:flex md:flex-wrap md:items-center md:justify-end md:gap-1 lg:gap-2">
                    {AdminMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className={`inline-flex items-center justify-center rounded-lg px-2 py-2 text-[10px] font-mono text-black transition duration-100 hover:scale-105 whitespace-nowrap md:text-xs lg:text-sm
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
