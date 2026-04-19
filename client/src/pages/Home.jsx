import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "../layout/Header";
import SideBar from "../layout/SideBar";

import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import UserDashboard from "../components/UserDashboard";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import HeroSection from "../layout/HeroSection";
import Collections from "../layout/Collections";
import AboutUs from "../layout/AboutUs";
import Authors from "../layout/Authors";
import Footer from "../layout/Footer";

const Home = () => {
  const [isSideBarOpen, setSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(""); //it will store "Dashboard","Users","Books","Catalog","MyBorrowedBooks"

  const user = useSelector((state) => state.authReducer.user);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

 

  return (
    <>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100 pt-16"> 
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
