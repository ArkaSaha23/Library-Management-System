import React, { useState } from "react";
import { useSelector } from "react-redux";

import logo from "../assets/logo.png";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import Collections from "./components/Collections";
import AboutUs from "./components/AboutUs";
import Authors from "./components/Authors";
import Footer from "./components/Footer";

const LandingPage = ({
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
      {isAuthenticated ? (
        <MainHeader toggleSidebar={toggleSidebar} />
      ) : (
        <Header toggleSidebar={toggleSidebar} />
      )}
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setSidebar={setSidebar}
        selectedComponent={selectedComponent}
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
