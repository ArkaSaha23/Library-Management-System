import React, { useState, useEffect } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { getAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { toggleAddBookPopup, toggleReadBookPopup, toggleRecordBookPopup} from "../store/slices/popUpSlice";
import { getAllBorrowedBooks,resetBorrowSlice} from "../store/slices/borrowSlice";

import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  const { loading, error, message, books } = useSelector((state) => state.bookReducer);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popUpReducer);
  const {loading: borrowLoading,error: borrowError,message: borrowMessage,userBorrowedBooks,allBorrowedBooks} = useSelector((state) => state.borrowReducer);


  //when user wants to open a book
  //each book will be having an id
  //we will take the id as argument
  const [readBook, setreadBook] = useState();
  const openBookPopUp = (id) => {
    const book = books.find((book) => book._id === id);
    setreadBook(book);
    dispatch(toggleReadBookPopup());
  };

  //When the user want to record the books
  const [borrowBookId, setBorrowBookId] = useState("");
  const openRecordBookPopUp = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };
 
  //to dispaly toast message
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetBookSlice());
    }

    if (borrowMessage) {
      toast.success(borrowMessage);
      dispatch(resetBorrowSlice());
    }

    if (error) {
      toast.error(error);
      dispatch(resetBookSlice());
    }

    if (borrowError) {
      toast.error(borrowError);
      dispatch(resetBorrowSlice());
    }
  }, [loading,message,error,borrowLoading,borrowMessage,borrowError,dispatch,]);

  //
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = Array.isArray(books)
    ? books.filter((book) =>
        book.title?.toLowerCase().includes(searchedKeyword),
      )
    : [];

  return (
    <>
      <main className="relative flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-slate-800 sm:text-xl md:text-2xl">
            {user && user.role === "Admin" ? "Book Management" : "Books"}
          </h2>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto lg:gap-4">
            {isAuthenticated && user?.role === "Admin" && (
              <button
                onClick={() => dispatch(toggleAddBookPopup())}
                className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 sm:w-auto sm:text-base"
              >
                <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-base font-bold text-slate-900">
                  +
                </span>
                Add Book
              </button>
            )}

            <input
              type="text"
              placeholder="Search Books"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 md:w-72"
              value={searchedKeyword}
              onChange={handleSearch}
            />
          </div>
        </header>

        {books && books.length > 0 ? (
          <div className="mt-6 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-4xl w-full border-collapse text-left text-sm text-slate-700">
                <thead>
                  <tr className="bg-slate-800 text-slate-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      Author
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      Edition
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      Language
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      Published Year
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                      Publisher
                    </th>
                    {isAuthenticated && user?.role === "Admin" && (
                      <th className="border border-slate-700 px-3 py-3 text-center font-semibold">
                        Quantity
                      </th>
                    )}
                    <th className="border border-slate-700 px-3 py-3 text-center font-semibold">
                      Price
                    </th>
                    <th className="border border-slate-700 px-3 py-3 text-center font-semibold">
                      Pages
                    </th>
                    <th className="border border-slate-700 px-3 py-3 text-center font-semibold">
                      Availability
                    </th>
                    {isAuthenticated && user?.role === "Admin" && (
                      <th className="border border-slate-700 px-3 py-3 text-center font-semibold">
                        Record
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {searchedBooks?.map((book, index) => (
                    <tr
                      key={book._id}
                      className="transition-colors hover:bg-gray-200"
                    >
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.title}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.author}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.description}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.edition}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.category}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.language}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.publishedYear}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.publisher}
                      </td>
                      {isAuthenticated && user?.role === "Admin" && (
                        <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                          {book.quantityAvailable}
                        </td>
                      )}
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.price}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.pages}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.isFree ? "Available" : "Not Available"}
                      </td>
                      {isAuthenticated && user?.role === "Admin" && (
                        <td className="px-4 py-2 space-x-2 flex justify-center items-center">
                          <BookA className="cursor-pointer" onClick={() => openBookPopUp(book._id)} />
                          <NotebookPen className="cursor-pointer" onClick={() => openRecordBookPopUp(book._id)}/>
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
            No Book found in the Library
          </div>
        )}
      </main>
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup />}
      {recordBookPopup && <RecordBookPopup />}
    </>
  );
}

export default BookManagement;
