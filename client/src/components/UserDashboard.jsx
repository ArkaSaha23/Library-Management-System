import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import BookOnTable from "../assets/BookOnTable.png";
import { Pie } from "react-chartjs-2";
import { IoLibrary, IoSettings } from "react-icons/io5";
import { ImLibrary } from "react-icons/im";
import { MdLocalLibrary } from "react-icons/md";
import { FaBookSkull } from "react-icons/fa6";

import SettingPopUp from "../popups/SettingPopup";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import { resetBorrowSlice, seeBorrowedBook } from "../store/slices/borrowSlice";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import SettingPopup from "../popups/SettingPopup";
import { FaAddressBook, FaBookMedical, FaPenFancy } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
);

const UserDashboard = ({ selectedComponent, setSelectedComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { settingPopup } = useSelector((state) => state.popUpReducer);
  const { userBorrowedBooks, message } = useSelector(
    (state) => state.borrowReducer,
  );
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);

  //const [currentTime, SetCurrentTime] = useState("");
  //const [currentDate, SetCurrentDate] = useState("");

  // useEffect(() => {
  //   const updateDateTime = () => {
  //     const now = new Date();
  //     //time
  //     const hours = now.getHours() % 12 || 12;
  //     const minutes = now.getMinutes().toString().padStart(2, "0");
  //     const seconds = now.getSeconds().toString().padStart(2, "0");
  //     const ampm = now.getHours() >= 12 ? "p.m." : "a.m.";

  //     SetCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);

  //     //date
  //     const curDate = {
  //       weekday: "long",
  //       month: "short",
  //       day: "numeric",
  //       year: "numeric",
  //     };
  //     SetCurrentDate(now.toLocaleDateString("en-IN", curDate));
  //   };
  //   updateDateTime(); //will run once immediately
  //   const intervalID = setInterval(updateDateTime, 1000); //after every 1 sec this function will run
  //   return () => clearInterval(intervalID); //
  // }, []);

  useEffect(() => {
    dispatch(seeBorrowedBook());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      dispatch(resetBorrowSlice());
    }
  }, [message, dispatch]);

  const currentDate = new Date();

  const totalBorrowedBooks = userBorrowedBooks.filter(
    (book) => !book.hasReturned,
  ).length;
  const totalReturnedBooks = userBorrowedBooks.filter(
    (book) => book.hasReturned,
  ).length;
  const OverDueBooks = userBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.Duedate);
    return dueDate <= currentDate;
  });
  const totalOverDueBooks = OverDueBooks.length;

  const data = {
    labels: ["Currently Borrowed Books", "Returned Books", "Overdue Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks, totalOverDueBooks],
        backgroundColor: ["#66B2FF", "#00FF80", "#FF3333"],
        hoverOffset: 6,
        borderWidth: 3,
        borderColor: "#ffffff",
      },
    ],
  };

  return (
    <>
      <div className="w-full px-3 py-6 md:px-6 bg-gray-300">
        {/* ================= WELCOME BANNER ================= */}
        <div className="mx-auto my-2 flex h-auto min-h-75 w-11/12 flex-col items-center justify-between gap-6 rounded-2xl bg-linear-to-r from-indigo-50 via-violet-50 to-blue-50 px-4 py-5 shadow-md sm:px-6 md:px-8 lg:h-75 lg:flex-row lg:gap-2 lg:py-0">
          {/* LEFT SIDE - Colorful Welcome Section */}
          <div className="relative flex w-full flex-col items-start justify-center overflow-hidden px-2 py-2 sm:px-4 lg:w-1/2 lg:px-6">
            {/* Soft background decorations */}
            <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-blue-100/60" />
            <div className="absolute bottom-0 left-1/3 h-16 w-16 rounded-full bg-purple-100/60" />

            {/* Small colorful badge */}
            <div className="relative mb-3 flex items-center gap-2 rounded-full bg-linear-to-r from-blue-50 to-purple-50 px-3 py-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-sm">
                ✨
              </span>
              <span className="flex items-center text-xs font-semibold text-blue-600 sm:text-sm gap-2">
                <h1>Your Library Space</h1>
                <ImLibrary className="text-xl" />
              </span>
            </div>

            {/* Welcome text */}
            <div className="relative w-full">
              {/* Mobile */}
              <span className="block text-base font-bold sm:text-xl md:hidden">
                👋 Welcome back,{" "}
                <span className="whitespace-nowrap text-blue-600">
                  {user.name}
                </span>
              </span>

              {/* Desktop */}
              <span className="hidden text-2xl font-bold md:block lg:text-3xl">
                👋 Welcome back,{" "}
                <span className="text-blue-600">{user.name}</span>
              </span>

              <span className="mt-2 flex items-center gap-2 text-xs text-gray-500 sm:text-base md:text-lg">
                <FaPenFancy className="shrink-0 text-purple-500 ml-8" />
                <span>
                  Ready to explore your{" "}
                  <span className="font-semibold text-purple-500">library</span>
                  ?
                </span>
              </span>
            </div>

            {/* Buttons */}
            <div className="relative mt-5 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              {/* View Books */}
              <button
                onClick={() => setSelectedComponent("BooksManagement")}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-600 hover:shadow-md sm:w-auto sm:px-5 sm:text-sm"
              >
                <span className="transition-transform duration-200 group-hover:rotate-6">
                  📚
                </span>
                View Our Books
              </button>

              {/* Settings */}
              <button
                onClick={() => dispatch(toggleSettingPopup())}
                className="group flex w-full items-center justify-center gap-2 rounded-lg border-2 border-purple-500 bg-linear-to-r from-gray-50 to-purple-50 px-4 py-2 text-xs font-semibold text-purple-500 shadow-sm ring-1 ring-gray-200 transition duration-200 hover:-translate-y-0.5 hover:from-purple-50 hover:to-pink-50 hover:shadow-md sm:w-auto sm:px-5 sm:text-sm"
              >
                <IoSettings className="text-base text-purple-500 transition-transform duration-300 group-hover:rotate-90 sm:text-lg" />
                Settings
              </button>
            </div>

            {/* Tiny decorative elements */}
            <span className="absolute right-0 top-20 md:top-25 text-3xl text-violet-700">
              <IoLibrary />
            </span>
            <span className=" absolute top-1 right-2 rotate-45 text-md  text-yellow-400">
              <FaAddressBook />
            </span>
            <span className=" absolute top-6 right-16 -rotate-20 text-xl text-pink-400">
              <FaBookMedical />
            </span>
            <span className=" absolute top-6 right-6 rotate-30 text-xl text-red-400">
              <FaBookSkull />
            </span>
          </div>

          {/* RIGHT SIDE - Colorful Library Illustration */}
          <div className="flex w-full items-center justify-center px-0 sm:px-2 lg:w-1/2 lg:px-4">
            <div className="relative h-55 w-full max-w-xl overflow-hidden rounded-3xl bg-linear-to-r from-sky-500 via-white to-purple-500 sm:h-52 md:h-56 lg:h-60">
              {/* Background decorative blobs */}
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-purple-100/70" />
              <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-yellow-100/70" />
              <div className="absolute left-1/2 top-4 h-20 w-20 rounded-full bg-pink-100/50" />

              {/* Decorative dots */}
              <div className="absolute left-5 top-8 h-2 w-2 rounded-full bg-blue-500 sm:left-8" />
              <div className="absolute left-12 top-14 h-2 w-2 rounded-full bg-pink-400 sm:left-16" />
              <div className="absolute right-16 top-8 h-2 w-2 rounded-full bg-yellow-400 sm:right-24" />
              <div className="absolute bottom-8 right-5 h-2 w-2 rounded-full bg-green-400 sm:bottom-10 sm:right-10" />

              {/* Stars */}
              <span className="absolute left-8 top-5 text-lg text-yellow-400 sm:left-12 sm:top-6 sm:text-xl">
                ✦
              </span>
              <span className="absolute right-16 top-10 text-base text-purple-400 sm:right-28 sm:top-12 sm:text-lg">
                ✦
              </span>
              <span className="absolute bottom-6 right-8 text-lg text-pink-400 sm:right-16 sm:bottom-7 sm:text-xl">
                ✧
              </span>

              {/* Lamp */}
              <div className="absolute right-8 top-0 flex flex-col items-center sm:right-16">
                <div className="h-7 w-0.5 bg-gray-400" />
                <div className="h-5 w-12 rounded-b-full bg-yellow-400 shadow-md" />
                <div className="h-2 w-8 rounded-full bg-yellow-200 blur-sm" />
              </div>

              {/* BOOKSHELF */}
              <div className="absolute bottom-9 left-1/2 w-[78%] -translate-x-1/2 sm:w-[70%]">
                {/* Top shelf */}
                <div className="absolute -top-3 left-0 h-2 w-full rounded-full bg-indigo-600 shadow-sm" />

                {/* Books */}
                <div className="flex h-28 items-end justify-center gap-0.5 sm:gap-1">
                  {/* Red book */}
                  <div className="h-18 w-5 -rotate-2 rounded-t-md bg-rose-400 shadow-sm sm:w-7">
                    <div className="mx-auto mt-4 h-1 w-3 rounded-full bg-rose-200 sm:w-4" />
                  </div>

                  {/* Blue book */}
                  <div className="h-24 w-6 rounded-t-md bg-blue-600 shadow-sm sm:w-8">
                    <div className="mx-auto mt-4 h-1 w-4 rounded-full bg-blue-300 sm:w-5" />
                    <div className="mx-auto mt-2 h-8 w-0.5 bg-blue-300" />
                  </div>

                  {/* Green book */}
                  <div className="h-16 w-5 rotate-2 rounded-t-md bg-emerald-400 shadow-sm sm:w-7">
                    <div className="mx-auto mt-3 h-1 w-3 rounded-full bg-emerald-100 sm:w-4" />
                  </div>

                  {/* Purple book */}
                  <div className="h-27 w-7 rounded-t-md bg-purple-600 shadow-sm sm:w-9">
                    <div className="mx-auto mt-5 h-1 w-4 rounded-full bg-purple-300 sm:w-5" />
                    <div className="mx-auto mt-2 h-10 w-0.5 bg-purple-300" />
                  </div>

                  {/* Yellow book */}
                  <div className="h-20 w-5 -rotate-1 rounded-t-md bg-amber-400 shadow-sm sm:w-7">
                    <div className="mx-auto mt-4 h-1 w-3 rounded-full bg-yellow-100 sm:w-4" />
                  </div>

                  {/* Orange book */}
                  <div className="h-24.5 w-6 rounded-t-md bg-orange-500 shadow-sm sm:w-8">
                    <div className="mx-auto mt-4 h-1 w-3 rounded-full bg-orange-200 sm:w-4" />
                  </div>

                  {/* Pink book */}
                  <div className="h-17.5 w-5 rotate-2 rounded-t-md bg-pink-500 shadow-sm sm:w-7">
                    <div className="mx-auto mt-3 h-1 w-3 rounded-full bg-pink-200 sm:w-4" />
                  </div>
                </div>

                {/* Main shelf */}
                <div className="h-3 w-full rounded-md bg-indigo-700 shadow-md" />

                {/* Bottom books */}
                <div className="mx-auto mt-2 flex h-8 w-[92%] items-end justify-center gap-1">
                  <div className="h-6 w-8 rounded-sm bg-red-200 shadow-sm sm:w-12" />
                  <div className="h-7 w-10 rounded-sm bg-blue-200 shadow-sm sm:w-14" />
                  <div className="h-5 w-7 rounded-sm bg-green-200 shadow-sm sm:w-10" />
                  <div className="h-6 w-8 rounded-sm bg-yellow-200 shadow-sm sm:w-12" />
                </div>
              </div>

              {/* OPEN BOOK */}
              <div className="absolute bottom-4 left-5 rotate-[-8deg] sm:bottom-5 sm:left-12">
                <div className="relative flex">
                  {/* Left page */}
                  <div className="h-8 w-9 rounded-l-md bg-white shadow-md sm:h-10 sm:w-12">
                    <div className="mx-2 mt-3 h-0.5 rounded-full bg-blue-200" />
                    <div className="mx-2 mt-2 h-0.5 rounded-full bg-purple-200" />
                    <div className="mx-2 mt-2 h-0.5 w-5 rounded-full bg-pink-200 sm:w-6" />
                  </div>

                  {/* Right page */}
                  <div className="h-8 w-9 rounded-r-md bg-yellow-50 shadow-md sm:h-10 sm:w-12">
                    <div className="mx-2 mt-3 h-0.5 rounded-full bg-yellow-300" />
                    <div className="mx-2 mt-2 h-0.5 rounded-full bg-green-200" />
                    <div className="mx-2 mt-2 h-0.5 w-5 rounded-full bg-blue-200 sm:w-6" />
                  </div>

                  {/* Center */}
                  <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-gray-200 sm:h-10" />
                </div>
              </div>

              {/* FLOATING BOOK */}
              <div className="absolute bottom-9 right-8 rotate-12 sm:right-14 sm:bottom-10">
                <div className="relative h-8 w-11 rounded-md bg-linear-to-r from-pink-500 to-purple-500 shadow-lg sm:h-10 sm:w-14">
                  <div className="absolute left-2 top-2 h-1 w-6 rounded-full bg-pink-200 sm:w-8" />
                  <div className="absolute left-2 top-5 h-1 w-4 rounded-full bg-purple-200 sm:w-5" />
                  <div className="absolute right-2 top-0 h-5 w-2 bg-yellow-300 sm:h-6" />
                </div>
              </div>

              {/* PLANT */}
              <div className="absolute bottom-7 right-2 sm:bottom-8 sm:right-4">
                <div className="relative">
                  {/* Leaves */}
                  <div className="absolute bottom-5 left-1 h-6 w-3 -rotate-35 rounded-full bg-green-400 sm:h-7 sm:w-4" />
                  <div className="absolute bottom-6 left-4 h-7 w-3 rotate-35 rounded-full bg-emerald-500 sm:h-8 sm:w-4" />
                  <div className="absolute bottom-5 left-6 h-5 w-3 rotate-60 rounded-full bg-lime-400 sm:h-6 sm:w-4" />

                  {/* Pot */}
                  <div className="mt-8 h-6 w-10 rounded-b-lg bg-orange-400 shadow-sm sm:h-7 sm:w-12" />
                </div>
              </div>

              {/* Decorative lines */}
              <div className="absolute bottom-12 left-4 h-0.5 w-5 rotate-[-20deg] rounded-full bg-pink-300 sm:bottom-14 sm:left-6 sm:w-6" />
              <div className="absolute right-5 top-20 h-0.5 w-6 rotate-20 rounded-full bg-blue-300 sm:right-8 sm:top-24 sm:w-8" />
            </div>
          </div>
        </div>

        {/* ================= DASHBOARD CONTENT ================= */}
        <div className="mx-auto mt-6 grid w-11/12 grid-cols-1 gap-5 md:grid-cols-2">
          {/* ================= LEFT - LIBRARY ACTIVITY ================= */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-center gap-3">
              <h2 className="mb-5 text-xl font-mono text-center font-semibold text-purple-800">
                Library Activity
              </h2>
              <MdLocalLibrary className="text-3xl mb-5 text-purple-400" />
            </div>

            <div className="space-y-4">
              {/**Total Borrowed Books */}
              <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-yellow-200">
                    📚
                  </div>

                  <div>
                    <p className="font-medium text-sm md:text-md text-yellow-800">
                      Total Borrowed Books
                    </p>
                  </div>
                </div>

                <span className="text-xl md:text-2xl font-bold text-yellow-600">
                  {String(totalBorrowedBooks + totalReturnedBooks).padStart(
                    2,
                    "0",
                  )}
                </span>
              </div>

              {/* Borrowed */}
              <div className="flex items-center justify-between rounded-xl bg-blue-50 p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-blue-200">
                    📔
                  </div>

                  <div>
                    <p className="font-medium text-sm md:text-md text-blue-800">
                      Currently Borrowed Books
                    </p>
                  </div>
                </div>

                <span className="text-xl md:text-2xl font-bold text-blue-600">
                  {String(totalBorrowedBooks).padStart(2, "0")}
                </span>
              </div>

              {/* Returned */}
              <div className="flex items-center justify-between rounded-xl bg-green-50 p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-green-200">
                    ✓
                  </div>

                  <div>
                    <p className="font-medium text-sm md:text-md text-green-800">
                      Returned Books
                    </p>
                  </div>
                </div>

                <span className="text-xl md:text-2xl font-bold text-green-600">
                  {String(totalReturnedBooks).padStart(2, "0")}
                </span>
              </div>

              {/* Overdue */}
              <div className="flex items-center justify-between rounded-xl bg-red-50 p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-red-200">
                    ⚠
                  </div>

                  <div>
                    <p className="font-medium text-sm md:text-md text-red-800">
                      Overdue Books
                    </p>
                  </div>
                </div>

                <span className="text-xl md:text-2xl font-bold text-red-600">
                  {String(totalOverDueBooks).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT - GRAPH ================= */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-center gap-3">
              <h2 className="mb-5 text-xl font-mono text-center font-semibold text-yellow-500">
                Borrowing Overview
              </h2>
              <MdLocalLibrary className="text-3xl mb-5 text-yellow-400" />
            </div>

            <div className="flex h-72 md:h-100 w-full items-center justify-center">
              <div className="relative h-full w-full max-w-lg flex justify-center">
                <Pie data={data} options={{cutout:0}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section></section>
      {settingPopup && <SettingPopUp />}
    </>
  );
};

export default UserDashboard;
