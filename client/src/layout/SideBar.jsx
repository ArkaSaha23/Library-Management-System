import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { logout } from "../store/slices/authSlice";

const SideBar = ({
  isSideBarOpen,
  setSidebar,
  SelectedComponent,
  setSelectedComponent,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || "User";

  const menuItems = [
    { label: "Dashboard", value: "Dashboard" },
    { label: "Books", value: "Books", adminOnly: true },
    { label: "Catalog", value: "Catalog", adminOnly: true },
    { label: "Users", value: "Users", adminOnly: true },
    { label: "My Borrowed Books", value: "MyBorrowedBooks", userOnly: true },
  ];

  const handleLogout = async () => {
    setSidebar(false);
    await dispatch(logout());
    navigate("/Login");
  };

  const handleVisitDashboard = () => {
    setSidebar(false);
    navigate("/Dashboard");
  };

  const handleLogin = () => {
    setSidebar(false);
    navigate("/Login");
  };

  const handleRegister = () => {
    setSidebar(false);
    navigate("/Register");
  };

  const handleSelect = (value) => {
    setSelectedComponent(value);
    setSidebar(false);
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 right-0 left-auto z-30 w-64 overflow-y-auto bg-white shadow-xl transition-transform duration-300 md:relative md:left-0 md:right-auto md:translate-x-0 ${
          isSideBarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-4 md:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setSidebar(false)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="md:hidden px-6 py-6">
          <h2 className="mb-4 text-xl font-semibold">Library Menu</h2>

          <div className="mb-4 space-y-2 md:hidden">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={handleLogin}
                  className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="block w-full rounded-xl bg-gray-600 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleVisitDashboard}
                  className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-xl bg-red-600 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              if (item.adminOnly && role !== "Admin") return null;
              if (item.userOnly && role !== "User") return null;
              return (
                <button
                  key={item.value}
                  onClick={() => handleSelect(item.value)}
                  className={`block w-full rounded-xl px-4 py-3 text-left transition ${
                    SelectedComponent === item.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/25 md:hidden"
          onClick={() => setSidebar(false)}
        />
      )}
    </>
  );
};

export default SideBar;
