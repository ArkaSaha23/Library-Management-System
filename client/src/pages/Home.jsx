import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";

import SideBar from "../layout/SideBar";

import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import UserDashboard from "../components/UserDashboard";
import MyBorrowedBooks from "../components/MyBorrowedBooks";

const Home = () => {
  const [isSideBarOpen, setSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(""); //it will store "Dashboard","Users","Books","Catalog","MyBorrowedBooks"

  function toggleSidebar() {
    const newState = !isSideBarOpen;
    setSidebar(newState);
    console.log(newState);
  }

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // if (!isAuthenticated) {
  //   return <Login />;
  // }
  return (
    <>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
        {/* Hamburger Menu */}
        <div className="md:hidden absolute p-4">
          <GiHamburgerMenu
            className="h-10 w-10 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        {/* sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 
          ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-4 text-xl font-bold">Menu</div>
          <ul className="p-4 space-y-4">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Profile</li>
            <li className="cursor-pointer">Settings</li>
          </ul>

          {/* Close Button */}
          <button
            className="absolute top-6 right-4 text-white cursor-pointer"
            onClick={toggleSidebar}
          >
            <RxCross1 />
          </button>
        </div>
        {/* Immediately invoked function expression */}
        {(() => {
          if (selectedComponent === "Dashboard") {
            if (user?.role === "User") {
              return <UserDashboard />;
            } else {
              return <AdminDashboard />;
            }
          } else if (selectedComponent === "Books") {
            return <BookManagement />;
          } else if (selectedComponent === "Catalog") {
            if (user?.role === "Admin") {
              return <Catalog />;
            } else {
              return null;
            }
          } else if (selectedComponent === "Users") {
            if (user?.role === "Admin") {
              return <Users />;
            } else {
              return null;
            }
          } else if (selectedComponent === "MyBorrowedBooks") {
            if (user?.role === "User") {
              return <MyBorrowedBooks />;
            } else {
              return null;
            }
          } else {
            // default
            if (user?.role === "User") {
              return <UserDashboard />;
            } else {
              return <AdminDashboard />;
            }
          }
        })()}
      </div>
    </>
  );
};

export default Home;
