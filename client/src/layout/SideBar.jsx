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
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  const user = useSelector((state) => state.authReducer.user);
  const role = user?.role || "User";

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

  const toggleSideBar = () => {
    setSidebar((prev) => !prev);
  };
  return (
    <>
      <aside
        className={`fixed inset-y-0 right-0 left-auto z-30 w-64 overflow-y-auto bg-white shadow-xl transition-transform duration-300 md:relative md:left-0 md:right-auto md:translate-x-0 ${
          isSideBarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-4 md:hidden">
          <span className="text-lg font-bold">Library Menu</span>
          <button
            onClick={toggleSideBar}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="md:hidden h-10/11 px-6 py-6 flex flex-col">
          <div className="mb-4 space-y-2 md:hidden">
            {!isAuthenticated ? (
              <>
                <div className="text-center">
                  <a
                    href="#home"
                    onClick={toggleSideBar}
                    className="font-extrabold hover:text-blue-600 transition text-sm lg:text-base"
                  >
                    Home
                  </a>
                </div>
                <div className="text-center">
                  <a
                    href="#collections"
                    onClick={toggleSideBar}
                    className="font-extrabold hover:text-blue-600 transition text-sm lg:text-base"
                  >
                    Collections
                  </a>
                </div>
                <div className="text-center">
                  <a
                    href="#author"
                    onClick={toggleSideBar}
                    className="font-extrabold hover:text-blue-600 transition text-sm lg:text-base"
                  >
                    Authors
                  </a>
                </div>

                <div className="text-center">
                  <a
                    href="#aboutus"
                    onClick={toggleSideBar}
                    className="font-extrabold hover:text-blue-600 transition text-sm lg:text-base"
                  >
                    About
                  </a>
                </div>
                <div>--------------------------------</div>
                <button
                  onClick={handleLogin}
                  className="block w-full border rounded-2xl bg-blue-400  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-500 hover:scale-120 duration-100 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="block w-full border rounded-2xl bg-green-300  px-4 py-3 text-sm font font-mono text-black text-center transition hover:bg-green-400 hover:scale-120 duration-100 cursor-pointer"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                {role === "User" && (
                  <>
                    <button
                      onClick={handleVisitDashboard}
                      className="block w-full border rounded-2xl bg-white  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-400 hover:scale-120 duration-100 cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full border rounded-2xl bg-white  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-400 hover:scale-120 duration-100 cursor-pointer"
                    >
                      My Borrowed Books
                    </button>
                  </>
                )}
                {role === "Admin" && (
                  <>
                    <button
                      onClick={handleVisitDashboard}
                      className="block w-full border rounded-2xl bg-white  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-400 hover:scale-120 duration-100 cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleVisitDashboard}
                      className="block w-full border rounded-2xl bg-white  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-400 hover:scale-120 duration-100 cursor-pointer"
                    >
                      Books
                    </button>
                    <button
                      onClick={handleVisitDashboard}
                      className="block w-full border rounded-2xl bg-white  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-400 hover:scale-120 duration-100 cursor-pointer"
                    >
                      Catalogs
                    </button>
                    <button
                      onClick={handleVisitDashboard}
                      className="block w-full border rounded-2xl bg-white  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-400 hover:scale-120 duration-100 cursor-pointer"
                    >
                      Users
                    </button>
                    <button
                      //onClick={handleLogout}
                      className="block w-full border rounded-2xl bg-white  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-400 hover:scale-120 duration-100 cursor-pointer"
                    >
                      Add New Admin
                    </button>
                    <button
                      onClick={handleVisitDashboard}
                      className="block w-full border rounded-2xl bg-white  px-4 py-3 text-sm font-mono text-black text-center transition hover:bg-blue-400 hover:scale-120 duration-100 cursor-pointer"
                    >
                      Update Credentials
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="mt-auto block w-full rounded-2xl bg-red-600 px-4 py-3 cursor-pointer text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </aside>

      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/25 md:hidden"
          onClick={toggleSideBar}
        />
      )}
    </>
  );
};

export default SideBar;
