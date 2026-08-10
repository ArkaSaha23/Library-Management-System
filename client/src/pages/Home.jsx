import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "../Home/components/Header";
import SideBar from "../layout/SideBar";

import MainHeader from "../layout/MainHeader";

import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import UserDashboard from "../components/UserDashboard";
import MyBorrowedBooks from "../components/MyBorrowedBooks";

import HeroSection from "../Home/components/HeroSection";
import Collections from "../Home/components/Collections";
import AboutUs from "../Home/components/AboutUs";
import Authors from "../Home/components/Authors";
import Footer from "../Home/components/Footer";

const Home = ({
  isSideBarOpen,
  setSidebar,
  selectedComponent,
  setSelectedComponent,
}) => {
  const user = useSelector((state) => state.authReducer.user);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated,
  );

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <MainHeader
        toggleSidebar={toggleSidebar}
        setSelectedComponent={setSelectedComponent}
      />

      <SideBar
        isSideBarOpen={isSideBarOpen}
        setSidebar={setSidebar}
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />
      <div className="relative flex min-h-screen bg-gray-100 pt-16">
        {/* {(user.role === "user")?<UserDashboard/> : <AdminDashboard/>} */}
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
