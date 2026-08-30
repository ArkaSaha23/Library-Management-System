import React, { useState } from "react";
import { useSelector } from "react-redux";

import SideBar from "../layout/SideBar";
import MainHeader from "../layout/MainHeader";

import AdminDashboard from "../components/AdminDashboard";
import BooksManagement from "../components/BookManagement";
import BorrowingManagement from "../components/BorrowingManagement";
import Users from "../components/Users";
import UserDashboard from "../components/UserDashboard";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import AddNewAdmin from "../components/AddNewAdmin";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [isSideBarOpen, setSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const {user,isAuthenticated} = useSelector((state) => state.authReducer);

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  if (!isAuthenticated) {
  return <Navigate to="/Login" replace />;
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return user?.role === "Admin" ? (
          <AdminDashboard selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
        ) : (
          <UserDashboard selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
        );

      case "BooksManagement": return <BooksManagement />;

      case "BorrowedBooks": return <MyBorrowedBooks />;

      case "BorrowingManagement": return user?.role === "Admin" ? ( <BorrowingManagement /> ) : (null);

      case "Users": return user?.role === "Admin" ? (<Users />) : (null);

      case "AddNewAdmin": return user?.role === "Admin" ? (<AddNewAdmin /> ) : ( null );

      default:
        return user?.role === "Admin" ? (
          <AdminDashboard selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
        ) : (
          <UserDashboard selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
      );
    }
  };



  return (
    <>
      <MainHeader
        toggleSidebar={toggleSidebar}
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />

      <SideBar
        isSideBarOpen={isSideBarOpen}
        setSidebar={setSidebar}
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />
      <div className="relative flex min-h-screen bg-gray-100 pt-16">
        {renderComponent()}
      </div>
    </>
  );
};

export default Home;
