import React, { useState, useEffect } from "react";
import { BookA, CloudHail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {toggleReadBookPopup,toggleReturnBookPopup} from "../store/slices/popUpSlice";
import { seeBorrowedBook, resetBorrowSlice } from "../store/slices/borrowSlice";
import { getAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { toast } from "react-toastify";
import ReadBookPopup from "../popups/ReadBookPopup";
import ReturnBookPopup from "../popups/ReturnBookPopup";
import { PiKeyReturnBold } from "react-icons/pi";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const { userBorrowedBooks, message } = useSelector((state) => state.borrowReducer);
  const { books , message : bookMessage } = useSelector((state) => state.bookReducer);
  const { readBookPopup, returnBookPopup } = useSelector((state) => state.popUpReducer);

  //get all the books and then if (bookMessage) then resetBookSlice 
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);
  
  useEffect(()=>{
    if (bookMessage) {
      dispatch(resetBookSlice());
    }
  },[dispatch,bookMessage]);

    //get all the Borrowed books By User and then if (message) then resetBorrowSlice 
  useEffect(() => {
    dispatch(seeBorrowedBook());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetBorrowSlice());
    }
  }, [message, dispatch]);

  console.log("List of books borrowed By user:",userBorrowedBooks);
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const day = `${String(date.getDate()).padStart(2, "0")}`;
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    const year = `${String(date.getFullYear())}`;
    const borrowedDate = `${day}-${month}-${year}`;
    return `${borrowedDate}`;
  };

    const formatDateTime = (timeStamp) => {
    const date = new Date(timeStamp);

    const day = `${String(date.getDate()).padStart(2, "0")}`;
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    const year = `${String(date.getFullYear())}`;
    const finalDate = `${day}-${month}-${year}`;
    const hours = `${String(date.getHours()).padStart(2, 0)}`;
    const finalTime = `${hours}:00:00`;
    return `${finalDate} before ${finalTime}`;
  };

  //get which book you want to read with ID
  const [readBook, setreadBook] = useState({});
  const [hasReturned,setHasReturned] = useState(false);
  const openBookPopUp = (id,hasReturned) => {
    console.log(hasReturned);
    const book = books.find((book) => book._id === id);
    setreadBook(book);
    setHasReturned(hasReturned);
    console.log(hasReturned);
    dispatch(toggleReadBookPopup());
  };

  //return the book back to library
  const [retunBookId, setReturnBookId] = useState({});
  const [returnBorrowId, setReturnBorrowId] = useState({});
  const returnBookPopUp = (bookId,borrowId) => {
    const book = books.find((book) => book._id === bookId);
    const borrowDetails = userBorrowedBooks.find((borrowDetails) => borrowDetails.borrowId === borrowId);
    //console.log("The Borrow ID that will be send to return book popup is:",borrowId);
    setReturnBorrowId(borrowDetails);
    setReturnBookId(book);
    dispatch(toggleReturnBookPopup());
  };

  const tableComponents = ["ID","Title","Borrowed Date","Due date","Read Books"];

  //we will filter books in two parts.user has alredy returned books//user yet to return
  const [filter, setFilter] = useState("Not Returned");

  const returnedBooks = userBorrowedBooks?.filter(
    (book) => book.hasReturned === true,
  );
  const notReturnedBooks = userBorrowedBooks?.filter(
    (book) => book.hasReturned === false,
  );
  const booksToDisplay = filter === "Returned" ? returnedBooks : notReturnedBooks;
  return (
    <>
      <main className="relative flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="font-semibold text-slate-800 text-xl md:text-2xl ">
            My Borrowed Books
          </h2>

          {/**ONLY USERS CAN SEE THIS PAGE */}
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

        {/**There is the list of books borrowed by user */}
        {booksToDisplay && booksToDisplay.length > 0 ? (
          <div className="mt-6 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-4xl w-full border-collapse text-left text-sm text-slate-700">
                <thead>
                  <tr className="bg-slate-800 text-slate-100">
                    {tableComponents.map((component, index) => (
                      <th
                        key={index}
                        className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600"
                      >
                        {component}
                      </th>
                    ))}
                    {filter === "Returned" && (
                    <th  className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                        View Return Details
                    </th>)}
                    
                  </tr>
                </thead>

                <tbody>
                  {booksToDisplay?.map((book, index) => (
                    <tr
                      key={index}
                      className="transition-colors hover:bg-gray-200"
                    >
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{index + 1}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{book.BookName}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{formatDate(book.borrowedDate)}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{formatDateTime(book.Duedate)}</td>
                      <td className="px-4 py-2 border-r border-gray-300">
                        <div className="flex justify-center items-center">
                          <BookA
                            className="cursor-pointer"
                            onClick={() => openBookPopUp(book.bookId,book.hasReturned)}
                          />
                        </div>
                      </td>
                      {filter === "Returned" && (
                      <td className="px-4 py-2">
                        <div className="flex justify-center items-center">
                            <PiKeyReturnBold
                              className="cursor-pointer w-6 h-6"
                              onClick={() => returnBookPopUp(book.bookId,book.borrowId)}
                            />
                        </div>
                      </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl p-6 text-center text-sm text-slate-600 sm:text-base">
            No Books Borrowed
          </div>
        )}
      </main>
      {readBookPopup && readBook && <ReadBookPopup book={readBook} hasReturned={hasReturned}/>}
      {returnBookPopup && <ReturnBookPopup book={retunBookId} borrowId={returnBorrowId}/>}
    </>
  );
};

export default MyBorrowedBooks;
