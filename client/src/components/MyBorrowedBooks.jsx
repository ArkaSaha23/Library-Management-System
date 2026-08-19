import React, { useState } from "react";
import { BookA } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const { userBorrowedBooks } = useSelector(
    (state) => state.borrowReducer,
  );
  const { books } = useSelector((state) => state.bookReducer);
  const { readBookPopup, returnBookPopup } = useSelector(
    (state) => state.popUpReducer,
  );

  //get which book you want to read with ID
  const [readBook, setreadBook] = useState();
  const openBookPopUp = (id) => {
    const book = books.find((book) => book._id === id);
    setreadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const formatDateTime = (timeStamp) => {
    const date = new Date(timeStamp);

    const day = `${String(date.getDate()).padStart(2, "0")}`;
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    const year = `${String(date.getFullYear())}`;
    const borrowedDate = `${day}-${month}-${year}`;

    const hours = `${String(date.getHours()).padStart(2, 0)}`;
    const minutes = `${String(date.getMinutes()).padStart(2, 0)}`;
    const seconds = `${String(date.getSeconds()).padStart(2, 0)}`;
    const borrowedTime = `${hours}:${minutes}:${seconds}`;

    return `${borrowedDate} ${borrowedTime}`;
  };

  //we will filter books in two parts.user has alredy returned books//user yet to return
  const [filter, setFilter] = useState("Returned");

  const returnedBooks = userBorrowedBooks.filter(
    (book) => book.hasReturned === true,
  );
  const notReturnedBooks = userBorrowedBooks.filter(
    (book) => book.hasReturned === false,
  );
  const booksToDisplay =
    filter === "Returned" ? returnedBooks : notReturnedBooks;

  return (
    <>
      <main className="relative flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="font-semibold text-slate-800 text-xl md:text-2xl ">
            My Borrowed Books
          </h2>

          
            {isAuthenticated && user?.role === "User" && (
              <div className="w-full flex justify-center items-center md:w-auto lg:gap-4">
                <button
                  onClick={() => setFilter("Returned")}
                  className={`cursor-pointer flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:w-auto sm:text-base ${filter === "Returned" ? "bg-black text-white " : "bg-white hover:bg-gray-300 border-gray-300 border text-black"}`}
                >
                  Returned Books
                </button>
                <button
                  onClick={() => setFilter("Not Returned")}
                  className={`cursor-pointer flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:w-auto sm:text-base ${filter === "Not Returned" ? "bg-black text-white " : "bg-white hover:bg-gray-300 border-gray-300 border text-black"}`}
                >
                  Non Returned Books
                </button>
              </div>
            )}
          
        </header>
      </main>
    </>
  );
};

export default MyBorrowedBooks;
