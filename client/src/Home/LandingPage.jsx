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

const LandingPage = () => {
  const [isSideBarOpen, setSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(""); //it will store "Dashboard","Users","Books","Catalog","MyBorrowedBooks"

  const user = useSelector((state) => state.authReducer.user);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated,
  );

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setSidebar={setSidebar}
        SelectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />

      <HeroSection />
      <Collections />
      <Authors />
      <AboutUs />
      <Footer />
    </>
  );
};

export default LandingPage;
