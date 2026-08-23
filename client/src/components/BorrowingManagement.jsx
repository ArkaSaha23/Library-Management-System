import React, { useEffect, useState } from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { getAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { getAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import ReturnBookPopup from "../popups/ReturnBookPopup";
const Catalog = () => {
  const dispatch = useDispatch()
  const { returnBookPopup } = useSelector((state) => state.popUpReducer);
  const { loading, error, message, allBorrowedBooks } = useSelector((state) => state.borrowReducer);
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);

    useEffect(() => {
      dispatch(getAllBorrowedBooks());
    }, [dispatch]);

    console.log("List of All the borrowed Books",allBorrowedBooks)


  const [filter, setFilter] = useState("borrowed");

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

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const day = `${String(date.getDate()).padStart(2, "0")}`;
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    const year = `${String(date.getFullYear())}`;
    const borrowedDate = `${day}-${month}-${year}`;
    return `${borrowedDate}`;
  };


  const currentDate = new Date();

  const borrowedBooks =  allBorrowedBooks?.filter((book) =>{
    const dueDate = new Date(book.DueDate);
    return (dueDate > currentDate)
  });

  const overDueBooks =  allBorrowedBooks?.filter((book) =>{
    const dueDate = new Date(book.DueDate);
    return (dueDate <= currentDate)
  });

  const tableComponents =["ID","Borrower Name","Borrower Email","Book Title","Borrowed Date","Due date","Has Returned","Fine","Return"];
  
  const BooksToDisplay = filter === "borrowed" ? borrowedBooks : overDueBooks;

  const [email,setEmail] = useState("");
  const [borrowedBookId , setborrowedBookId] = useState("");

  const openReturnBookPopUp = (email,bookId) =>{
    console.log("Return Book id",bookId);
    setEmail(email);
    setborrowedBookId(bookId);
    //console.log("Return Book id",borrowedBookId);
    dispatch(toggleReturnBookPopup());
  }

  useEffect( ()=>{
    if(message){
      toast.success(message);
      dispatch(getAllBooks());
      dispatch(getAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if(error){
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  },[dispatch,message,error,loading])  ///message not written

  return <>
  <main className="relative flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          {/**ONLY USERS CAN SEE THIS PAGE */}
          {isAuthenticated && user?.role === "Admin" && (
            <div className="w-full flex justify-center items-center md:w-auto lg:gap-4">
              <button
                onClick={() => setFilter("borrowed")}
                className={`cursor-pointer flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:w-auto sm:text-base ${filter === "borrowed" ? "bg-black text-white " : "bg-white hover:bg-gray-300 border-gray-300 border text-black"}`}
              >
                Borrowed Books
              </button>
              <button
                onClick={() => setFilter("overdue")}
                className={`cursor-pointer flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition sm:w-auto sm:text-base ${filter === "overdue" ? "bg-black text-white " : "bg-white hover:bg-gray-300 border-gray-300 border text-black"}`}
              >
                Overdue Books
              </button>
            </div>
          )}
        </header>

        {/**There is the list of books borrowed by user */}
        {BooksToDisplay && BooksToDisplay.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {BooksToDisplay?.map((book, index) => (
                    <tr
                      key={index}
                      className="transition-colors hover:bg-gray-200"
                    >
                      {/**["ID","Borrower Name","Borrower Email","Book Title","Borrowed Date","Due date","Has Returned","Fine","Return"]; */}
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{index + 1}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{book.UserName}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{book.UserEmail}</td>                     
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{book.BookName}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{formatDate(book.BorrowDate)}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{formatDateTime(book.DueDate)}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{book.ReturnDate ? "Returned":"Not Returned"}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">{book.fine}</td>
                      <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                        {book.ReturnDate ? (
                          <div>
                            <FaSquareCheck className="w-6 h-6"/>
                           
                          </div>
                           
                        ) : (
                          <div>
                            <PiKeyReturnBold onClick={()=>openReturnBookPopUp(book?.UserEmail,book.BookId)} className="w-6 h-6"/>
                              <h1></h1>
                          </div>
                          
                        )}
                      </td>
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
      {returnBookPopup && <ReturnBookPopup email={email} bookId={borrowedBookId} />}
  
  </>;
};

export default Catalog;
