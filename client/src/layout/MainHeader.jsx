import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const MainHeader = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentTime, SetCurrentTime] = useState("");
  const [currentDate, SetCurrentDate] = useState("");

  const user = useSelector((state) => state.authReducer.user);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  const role = user?.role || "User";

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
      <header className="w-full h-20 fixed top-0 left-0 right-0 z-20 bg-gray-100 shadow-md">
        <div className="mx-auto max-full grid grid-cols-5 md:grid-cols-20 gap-4 px-3 ">
          {/* left side logo */}
          <div
            className="col-span-1 col-start-1 md:col-span-2 md:col-start-1 flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
            onClick={() => navigate("/")}
          >
            <span className="text-lg font-semibold tracking-wide">
              <img
                className="h-20 sm:h-20 object-contain"
                src={logo}
                alt="logo"
              />
            </span>
          </div>

          {/* center section...search bar */}
          <div className="col-span-3 col-start-2 md:col-span-5 md:col-start-3 w-full flex justify-center items-center">
            <div className="bg-gray-100 w-full h-10 flex justify-center items-center">
              {/* search icon */}
              <div className="h-10 lg:15 w-12 border bg-yellow-100 rounded-l-sm flex justify-center items-center">
                <FaMagnifyingGlass className="w-full h-2/5" />
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
          {!isAuthenticated ? (
            <Navigate to="/Login" />
          ) : (
            <>
              {role == "User" && (
                <>
                  <div className="hidden md:flex md:col-span-8 md:col-start-12 items-center justify-center gap-4">
                    <div className="col-span-1 col-start-10">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-md font-mono text-black text-center transition hover:border-black hover:border hover:scale-120 duration-100 cursor-pointer"
                      >
                        DashBoard
                      </button>
                    </div>
                    <div className="col-span-1 col-start-14">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-md font-mono text-black text-center transition  hover:border-black hover:border hover:scale-120 duration-100 cursor-pointer"
                      >
                        My Borrowed Books
                      </button>
                    </div>
                    <div className="col-span-1 col-start-17">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full px-2 py-2 text-2xl font-mono text-black text-center transition hover:scale-150 duration-100 cursor-pointer"
                      >
                        <IoIosNotifications />
                      </button>
                    </div>
                    <div className="col-span-1 col-start-18">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-md font-mono text-black text-center transition hover:bg-red-500 hover:scale-120 duration-100 hover:font-extrabold cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      className="col-span-1 col-start-4 md:hidden rounded-xl"
                      onClick={toggleSidebar}
                    >
                      <GiHamburgerMenu className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </>
              )}
              {role == "Admin" && (
                <>
                  <div className="md:col-span-8 md:col-start-11 md:flex hidden md:justify-center md:items-center">
                    <div className="col-span-1 col-start-11">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-xs font-mono text-black text-center transition hover:border-black hover:border hover:scale-120 duration-100 cursor-pointer"
                      >
                        DashBoard
                      </button>
                    </div>
                    <div className="col-span-1 col-start-12">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-xs font-mono text-black text-center transition  hover:border-black hover:border hover:scale-120 duration-100 cursor-pointer"
                      >
                        My Borrowed Books
                      </button>
                    </div>
                    <div className="col-span-1 col-start-13">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-xs font-mono text-black text-center transition  hover:border-black hover:border hover:scale-120 duration-100 cursor-pointer"
                      >
                        Catalogs
                      </button>
                    </div>
                    <div className="col-span-1 col-start-14">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-xs font-mono text-black text-center transition  hover:border-black hover:border hover:scale-120 duration-100 cursor-pointer"
                      >
                        Users
                      </button>
                    </div>
                    <div className="col-span-1 col-start-15">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-xs font-mono text-black text-center transition  hover:border-black hover:border hover:scale-120 duration-100 cursor-pointer"
                      >
                        Add New Admin
                      </button>
                    </div>
                    <div className="col-span-1 col-start-16">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-xs font-mono text-black text-center transition hover:border-black hover:border hover:scale-120 duration-100 cursor-pointer"
                      >
                        Update Credentials
                      </button>
                    </div>
                    <div className="col-span-1 col-start-17">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full px-2 py-2 text-2xl font-mono text-black text-center transition hover:scale-150 duration-100 cursor-pointer"
                      >
                        <IoIosNotifications />
                      </button>
                    </div>
                    <div className="col-span-1 col-start-18">
                      <button
                        onClick={() => handleSelect("Catalog")}
                        className="block w-full rounded-lg px-2 py-2 text-xs font-mono text-black text-center transition hover:bg-red-500 hover:scale-120 duration-100 hover:font-extrabold cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      className="col-span-1 col-start-4 md:hidden rounded-xl"
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

      {/* BELOW HEADER */}
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
          {/*Right side*/}
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
      </header>
    </>
  );
};

export default MainHeader;
