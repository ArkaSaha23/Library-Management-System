import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
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
import { getAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { ImLibrary } from "react-icons/im";
import { FaAddressBook, FaBook, FaBookMedical, FaPenFancy } from "react-icons/fa";
import { IoLibrary, IoSettings } from "react-icons/io5";
import { FaBookSkull } from "react-icons/fa6";
import {  Users} from "lucide-react";

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

const AdminDashboard = ({ selectedComponent, setSelectedComponent }) => {

  const dispatch = useDispatch();
  const { settingPopup } = useSelector((state) => state.popUpReducer);
  const { allBorrowedBooks, message } = useSelector((state) => state.borrowReducer);
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);

  console.log(user)

  useEffect(() => {
    dispatch(getAllBorrowedBooks());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      dispatch(resetBorrowSlice());
    }
  }, [message, dispatch]);

  console.log(allBorrowedBooks);

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
    <div className="w-full px-3 py-6 md:px-6 bg-gray-300">
      {/* ================= WELCOME BANNER ================= */}
      <div className="mx-auto my-2 flex h-auto min-h-85 w-11/12 flex-col items-center justify-between gap-6 rounded-2xl bg-linear-to-r from-indigo-50 via-violet-50 to-blue-50 px-4 py-5 shadow-md sm:px-6 md:px-8 md:mt-10 xl:mt-5 lg:h-75 lg:flex-row lg:gap-2 lg:py-0">
        {/* LEFT SIDE - Colorful Welcome Section */}
        <div className="relative flex w-full flex-col items-start justify-center overflow-hidden px-2 py-2 sm:px-4 lg:w-1/2 lg:px-6">
          {/* Soft background decorations */}
          <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-blue-100/60" />
          <div className="absolute bottom-0 left-1/3 h-16 w-16 rounded-full bg-purple-100/60" />

          {/* Small colorful badge */}
          <div className="relative mb-1 flex items-center gap-2 rounded-full bg-linear-to-r from-blue-50 to-purple-50 px-3 py-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-sm">
              ✨
            </span>
            <span className="flex items-center text-xs font-semibold text-blue-600 sm:text-sm lg:text-md gap-2">
              <h1>Admin Space</h1>
              <ImLibrary className="text-xl" />
            </span>
          </div>

          <div className="flex gap-2 items-center ml-2 mt-2 mb-3">
            <h1 className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-xs md:text-lg xl:text-xl font-semibold ">ShelfSync, Library Management System</h1>
            <IoLibrary className="text-purple-500"/>
          </div>
          


          {/* Welcome text */}
          <div className="relative w-full">
            {/* Mobile */}
            <span className="block text-base font-bold sm:text-xl lg:text-2xl md:hidden">
              👋 Welcome back,{" "}
              <span className="whitespace-nowrap text-blue-600">
                {user?.name}
              </span>
            </span>

            {/* Desktop */}
            <span className="hidden text-2xl font-bold md:block lg:text-3xl">
              👋 Welcome back,{" "}
              <span className="text-blue-600">{user?.name}</span>
            </span>

            <span className="mt-2 flex items-center gap-2 text-xs text-gray-500  md:text-lg">
              <FaPenFancy className="shrink-0 text-purple-500" />
              <span>Manage your
                <span className="font-semibold text-purple-500"> library, books,</span> 
                <span> and </span>
                <span className="font-semibold text-purple-500">readers </span> 
                with ease.
              </span>
            </span>
          </div>

          <div className="relative mt-5 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {/* View Books */}
            <button
              onClick={() => setSelectedComponent("BooksManagement")}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-600 hover:shadow-md sm:w-auto sm:px-5 sm:text-sm cursor-pointer"
            >
              <span className="transition-transform duration-200 group-hover:rotate-6">
                {" "}
                <FaBook className="text-xl"/>
              </span>
              Manage Library Books
            </button>

            <button
              onClick={() => setSelectedComponent("Users")}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-600 hover:shadow-md sm:w-auto sm:px-5 sm:text-sm cursor-pointer"
            >
              <span className="transition-transform duration-200 group-hover:rotate-6">
                {" "}
                <Users/>
              </span>
              View Library Users
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
          <span className="hidden sm:flex absolute top-1 right-2 rotate-45 text-md  text-yellow-400">
            <FaAddressBook />
          </span>
          <span className="hidden sm:flex absolute top-6 right-16 -rotate-20 text-xl text-pink-400">
            <FaBookMedical />
          </span>
          <span className="hidden sm:flex absolute top-6 right-6 rotate-30 text-xl text-red-400">
            <FaBookSkull />
          </span>
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
                    <p className="text-[10px] font-bold leading-tight text-white sm:text-xs">
                      {book.title}
                    </p>
                  </div>
                  <span className="absolute bottom-3 right-3 text-[9px] font-semibold text-white/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default AdminDashboard;
