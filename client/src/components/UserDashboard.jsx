import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { IoLibrary, IoSettings } from "react-icons/io5";
import { ImLibrary } from "react-icons/im";
import { MdLocalLibrary } from "react-icons/md";
import { FcOvertime } from "react-icons/fc";
import { PiKeyReturnFill } from "react-icons/pi";
import { FaBookReader, FaChartPie } from "react-icons/fa";
import { FaBookSkull } from "react-icons/fa6";

import SettingPopUp from "../popups/SettingPopup";

import { useDispatch, useSelector } from "react-redux";

import {Chart as ChartJS, Tooltip, Legend, ArcElement,} from "chart.js";
import { resetBorrowSlice, seeBorrowedBook } from "../store/slices/borrowSlice";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { FaAddressBook, FaBookMedical, FaPenFancy,FaBook } from "react-icons/fa";

ChartJS.register(Tooltip,Legend,ArcElement);

const UserDashboard = ({ selectedComponent, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { settingPopup } = useSelector((state) => state.popUpReducer);
  const { userBorrowedBooks, message } = useSelector((state) => state.borrowReducer,);
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(seeBorrowedBook());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      dispatch(resetBorrowSlice());
    }
  }, [message, dispatch]);

  const currentDate = new Date();

  const totalBorrowedBooks = userBorrowedBooks.length;
  const currentlyBorrowedBooks = userBorrowedBooks.filter((book) => !book.hasReturned).length;
  const totalReturnedBooks = userBorrowedBooks.filter((book) => book.hasReturned).length;

  const booksOverdue = [];
  const OverDueBooks = userBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.Duedate);
    if (dueDate <= currentDate) {
      booksOverdue.push({
        bookName: book.BookName,
        dueDate: book.Duedate,
      });
    }
    return dueDate <= currentDate;
  });
  const totalOverDueBooks = OverDueBooks.length;

  const upcomingReturns = userBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.Duedate);
    const dayCount = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));
    return (!book.hasreturned && dayCount >=0 && dayCount <= 3);
  });
  const data = {
    labels: ["Currently Borrowed Books", "Returned Books", "Overdue Books"],
    datasets: [
      {
        data: [currentlyBorrowedBooks, totalReturnedBooks, totalOverDueBooks],
        backgroundColor: ["#66B2FF", "#00FF80", "#FF3333"],
        hoverOffset: 6,
        borderWidth: 3,
        borderColor: "#ffffff",
      },
    ],
  };

  const formatDateTime = (timeStamp) => {
    const date = new Date(timeStamp);

    const day = `${String(date.getDate()).padStart(2, "0")}`;
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    const year = `${String(date.getFullYear())}`;
    const borrowedDate = `${day}-${month}-${year}`;
    const hours = `${String(date.getHours()).padStart(2, 0)}`;
    const borrowedTime = `${hours}:00:00`;
    return `${borrowedDate} before ${borrowedTime}`;
  };

 const bookTitles = ["Pride and Prejudice", "1984", "The Great Gatsby", "The Alchemist", "The Hobbit", "Animal Farm", "The Little Prince", "The Book Thief", "Jane Eyre", "Little Women", "The Guide", "Malgudi Days", "Train to Pakistan", "Midnight's Children", "The God of Small Things", "The White Tiger", "A Suitable Boy", "Swami and Friends", "The Namesake", "Gitanjali", "Pather Panchali", "Devdas", "Chokher Bali", "Aranyak", "Gora", "Srikanta", "Durgeshnandini", "Kapalkundala", "Mahesh", "Hajar Churashir Ma", "To Kill a Mockingbird", "The Catcher in the Rye", "The Lord of the Rings", "Harry Potter", "The Kite Runner", "A Thousand Splendid Suns", "The Old Man and the Sea", "Crime and Punishment", "Great Expectations", "Oliver Twist", "Wuthering Heights", "The Picture of Dorian Gray", "The Adventures of Sherlock Holmes", "Moby-Dick", "Don Quixote", "The Odyssey", "The Iliad", "War and Peace", "The Brothers Karamazov", "The Stranger"];

  const bookColors = ["from-blue-500 to-indigo-600", "from-purple-500 to-violet-600", "from-rose-400 to-pink-600", "from-emerald-400 to-green-600", "from-orange-400 to-amber-500", "from-cyan-400 to-teal-600", "from-red-400 to-rose-600", "from-yellow-400 to-orange-500", "from-fuchsia-500 to-purple-600", "from-sky-400 to-blue-600", "from-lime-400 to-green-500", "from-teal-400 to-cyan-600", "from-indigo-500 to-purple-600", "from-amber-400 to-yellow-500", "from-pink-400 to-rose-500", "from-violet-500 to-fuchsia-600", "from-slate-500 to-gray-700", "from-red-500 to-orange-500", "from-green-500 to-teal-600", "from-blue-400 to-cyan-500"];

  const [randomBooks] = useState(() =>
    Array.from({ length: 6 }, (_, index) => ({
      title: bookTitles[Math.floor(Math.random() * bookTitles.length)],
      color: bookColors[Math.floor(Math.random() * bookColors.length)],
      rotate: Math.floor(Math.random() * 13) - 6,
    })),
  );

  return (
    <>
      <main className="w-full px-3 py-6 md:px-6 bg-gray-300">
        {/* ================= WELCOME BANNER ================= */}
        <section className="mx-auto my-2 flex h-auto min-h-75 w-11/12 flex-col items-center justify-between gap-6 rounded-2xl bg-linear-to-r from-indigo-50 via-violet-50 to-blue-50 px-4 py-5 shadow-md sm:px-6 md:px-8 md:mt-8 lg:mt-3 lg:h-75 lg:flex-row lg:gap-2 lg:py-0">
          {/* LEFT SIDE - Colorful Welcome Section */}
          <div className="relative flex w-full flex-col items-start justify-center overflow-hidden px-2 py-2 sm:px-4 lg:w-1/2 lg:px-6">
            {/* Soft background decorations */}
            <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-blue-100/60" />
            <div className="absolute bottom-0 left-1/3 h-16 w-16 rounded-full bg-purple-100/60" />

            {/* Small colorful badge */}
            <div className="relative mb-1 flex items-center gap-2 rounded-full bg-linear-to-r from-blue-50 to-purple-50 px-3 py-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-sm">✨</span>
              <span className="flex items-center text-xs font-semibold text-blue-600 sm:text-sm lg:text-md gap-2">
                <h1>Your Library Space</h1>
                <ImLibrary className="text-xl" />
              </span>
            </div>

            <div className="flex gap-2 items-center ml-2 mt-2 mb-3">
              <h1 className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-xs md:text-lg xl:text-xl font-bold ">ShelfSync, Library Management System</h1>
              <FaBookReader className="text-purple-500"/>
            </div>

            {/* Welcome text */}
            <div className="relative w-full">
              {/* Mobile */}
              <span className="block text-base font-bold sm:text-xl lg:text-2xl md:hidden">
                👋 Your Dashboard,{" "}
                <span className="whitespace-nowrap text-blue-600">{user.name}</span>
              </span>

              {/* Desktop */}
              <span className="hidden text-2xl font-bold md:block lg:text-3xl">
                👋 Your Dashboard,{" "}
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

            <div className="relative mt-5 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              {/* View Books */}
              <button
                onClick={() => setSelectedComponent("BooksManagement")}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-600 hover:shadow-md sm:w-auto sm:px-5 sm:text-sm cursor-pointer"
              >
                <span className="transition-transform duration-200 group-hover:rotate-6"><FaBook/></span>
                View Our Books
              </button>

              {/* Settings */}
              <button
                onClick={() => dispatch(toggleSettingPopup())}
                className="group flex w-full items-center justify-center gap-2 rounded-lg border-2 border-purple-500 bg-linear-to-r from-gray-50 to-purple-50 px-4 py-2 text-xs font-semibold text-purple-500 shadow-sm ring-1 ring-gray-200 transition duration-200 hover:-translate-y-0.5 hover:from-purple-50 hover:to-pink-50 hover:shadow-md sm:w-auto sm:px-5 sm:text-sm cursor-pointer"
              >
                <IoSettings className="text-base text-purple-500 transition-transform duration-300 group-hover:rotate-90 sm:text-lg" />
                Settings
              </button>
            </div>

            {/* Tiny decorative elements */}
            <span className="absolute right-0 top-20 md:top-25 text-3xl text-violet-700"><IoLibrary /></span>
            <span className=" absolute top-1 right-2 rotate-45 text-md  text-yellow-400"><FaAddressBook /></span>
            <span className=" absolute top-6 right-16 -rotate-20 text-xl text-pink-400"><FaBookMedical /></span>
            <span className=" absolute top-6 right-6 rotate-30 text-xl text-red-400"><FaBookSkull /></span>
          </div>

          {/* RIGHT SIDE - Colorful Library Illustration */}
          <div className="flex w-full items-center justify-center px-0 sm:px-2 lg:w-1/2 lg:px-4">
            <div className="relative flex h-55 w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl sm:h-52 md:h-56 lg:h-60">
              <div className="flex items-end justify-center -space-x-5">
                {randomBooks.map((book, index) => (
                  <div
                    key={index}
                    style={{ transform: `rotate(${book.rotate}deg)` }}
                    className={`relative h-40 w-24 rounded-lg bg-linear-to-br ${book.color} border-2 border-white shadow-xl hover:rotate-0 sm:h-44 sm:w-27 md:h-48 md:w-28 ${index >= 4 ? "hidden sm:block" : ""}`}
                  >
                    <div className="absolute left-2 top-0 h-full w-1 bg-black/10" />
                    <div className="absolute inset-2 rounded-md border border-white/30" />
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 text-center">
                      <p className="text-[10px] font-bold leading-tight text-white sm:text-xs">{book.title}</p>
                    </div>
                    <span className="absolute bottom-3 right-3 text-[9px] font-semibold text-white/60">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= DASHBOARD CONTENT ================= */}
        <section className="mx-auto mt-6 grid w-11/12 grid-cols-1 gap-5 md:grid-cols-2">
          {/* ================= LEFT - LIBRARY ACTIVITY ================= */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-center gap-3">
              <h2 className="mb-5 text-xl font-mono text-center font-semibold text-purple-800">Library Activity</h2>
              <MdLocalLibrary className="text-3xl mb-5 text-purple-400" />
            </div>

            <div className="space-y-4">
              {/**Total Borrowed Books */}
              <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-yellow-200">📚</div>
                  <p className="font-medium text-sm md:text-md text-yellow-800">Total Borrowed Books</p>
                </div>
                <span className="text-xl md:text-2xl font-bold text-yellow-600">{String(totalBorrowedBooks).padStart(2, "0")}</span>
              </div>

              {/** Borrowed */}
              <div className="flex items-center justify-between rounded-xl bg-blue-50 p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-blue-200">📔</div>
                  <p className="font-medium text-sm md:text-md text-blue-800">Currently Borrowed Books</p>
                </div>
                <span className="text-xl md:text-2xl font-bold text-blue-600">{String(currentlyBorrowedBooks).padStart(2, "0")}</span>
              </div>

              {/** Returned */}
              <div className="flex items-center justify-between rounded-xl bg-green-50 p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-green-200">✓</div>
                  <p className="font-medium text-sm md:text-md text-green-800">Returned Books</p>
                </div>
                <span className="text-xl md:text-2xl font-bold text-green-600">{String(totalReturnedBooks).padStart(2, "0")}</span>
              </div>

              {/** Overdue */}
              <div className="flex items-center justify-between rounded-xl bg-red-50 p-2 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg bg-red-200">⚠</div>
                  <p className="font-medium text-sm md:text-md text-red-800">Overdue Books</p>
                </div>
                <span className="text-xl md:text-2xl font-bold text-red-600">{String(totalOverDueBooks).padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          {/** RIGHT GRAPH */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-center gap-3">
              <h2 className="mb-5 text-xl font-mono text-center font-semibold text-yellow-500">Borrowing Overview</h2>
              <FaChartPie className="text-3xl mb-5 text-yellow-400" />
            </div>

          <div className="flex h-72 md:h-100 w-full items-center justify-center">
            <div className="relative h-full w-full max-w-lg flex justify-center">
              <Pie data={data} options={{ cutout: 0 }} />
            </div>
          </div>
        </div>
        </section>

        {/**OverDue Books and Upcoming Returns */}
        <section className="mx-auto mt-6 grid w-11/12 grid-cols-1 gap-5 md:grid-cols-2">
          {/**Overdue Books */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-center gap-3">
              <h2 className="mb-5 text-xl font-mono text-center font-semibold text-red-400">OverDue Book List</h2>
              <FcOvertime className="text-3xl mb-5 text-red-400" />
            </div>
            <div>
              {booksOverdue?.length > 0 ? (
                <div className="w-full overflow-x-auto rounded-xl border border-red-100">
                  <table className="w-full min-w-125 text-left">
                    <thead className="bg-red-50">
                      <tr>
                        <th className="p-2 flex justify-center items-center text-gray-700">SL no.</th>
                        <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-700 sm:px-5">Book Name</th>
                        <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-700 sm:px-5">Due Date Passed</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">
                      {booksOverdue.map((book, index) => (
                        <tr
                          key={index}
                          className="transition hover:bg-red-50/40"
                        >
                          <td className="p-2 flex justify-center items-center">{index + 1}</td>
                          <td className="px-4 py-3 sm:px-5">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-gray-700">{book.bookName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 sm:px-5">{formatDateTime(book.dueDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border-2 border-red-200 bg-red-50 px-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-200 text-red-700 text-2xl font-bold">✓</div>
                  <p className="text-xl font-bold text-red-700 sm:text-base">No Overdue Books</p>
                  <p className="text-sm font-bold text-red-500">Thank You for your cooperation</p>
                </div>
              )}
            </div>
          </div>

          {/**Upcoming returns */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-center gap-3">
              <h2 className="mb-5 text-xl font-mono text-center font-semibold text-green-400">Upcoming Returns</h2>
              <PiKeyReturnFill className="text-3xl mb-5 text-green-400" />
            </div>
            <div>
              {upcomingReturns.length > 0 ? (
                <div className="w-full overflow-x-auto rounded-xl border border-red-100">
                  <table className="w-full min-w-125 text-left">
                    <thead className="bg-green-50">
                      <tr>
                        <td className="p-2 flex justify-center items-center text-gray-700">SL no.</td>
                        <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-700 sm:px-5">Book Name</th>
                        <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-700 sm:px-5">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {upcomingReturns.map((book, index) => (
                        <tr
                          key={index}
                          className="transition hover:bg-red-50/40"
                        >
                          <td className="p-2 flex justify-center items-center">{index + 1}</td>
                          <td className="px-4 py-3 sm:px-5">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-gray-700">{book.BookName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 sm:px-5">{formatDateTime(book.Duedate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border-2 border-green-200 bg-green-50 px-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-200 text-green-700 text-2xl font-bold">
                    ✓
                  </div>
                  <p className="text-xl font-bold text-green-700 sm:text-base">No Upcoming Returns</p>
                  <p className="text-sm font-bold text-green-500">You're all caught up for now!</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
      </main>
      
      {settingPopup && <SettingPopUp />}
    </>
  );
};

export default UserDashboard;
