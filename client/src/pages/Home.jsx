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

const Home = ({
 
}) => {
  const [isSideBarOpen, setSidebar] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

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
        {(() => {
          if (selectedComponent === "Dashboard"){
            if (user?.role === "User")  return <UserDashboard />; 
            else return <AdminDashboard />;
          }
          else if (selectedComponent === "BorrowingManagement" && user?.role === "Admin")  return <BorrowingManagement />;
          else if (selectedComponent === "BorrowedBooks")                   return <MyBorrowedBooks />;
          else if (selectedComponent === "BooksManagement")                 return <BooksManagement/>
          else if (selectedComponent === "Users" && user?.role === "Admin") return <Users />;
          else if(selectedComponent === "AddNewAdmin")                      return <AddNewAdmin/>

          //DEFAULT 
          else {        
            if (user?.role === "User") return <UserDashboard />;
            else return <AdminDashboard />;
          }
        })()}
      </div>
    </>
  );
};

export default Home;
