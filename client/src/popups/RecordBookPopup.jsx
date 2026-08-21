import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { toggleRecordBookPopup } from "../store/slices/popUpSlice";
import {borrowBook, resetBorrowSlice} from "../store/slices/borrowSlice";

const RecordBookPopup = ({ book }) => {
  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.borrowReducer);
  
  const [email,setEmail] = useState("");

  const handleRecordBook = (e) => {
    e.preventDefault(); //It prevents the page from gettimng reoad or getting refreshed
    dispatch(borrowBook( email, book ));
    setEmail("");
  };
  useEffect(()=>{
    if(message){
      dispatch(resetBorrowSlice());
    }
  },[message,dispatch])
  
  console.log("Message",message)
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
        <div className="w-11/12 rounded-lg bg-white shadow-lg sm:w-1/2">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-black px-6 py-4 text-white">
            <h2 className="text-lg font-bold">Record Book</h2>

            <button
              type="button"
              className="text-xl font-bold text-white cursor-pointer"
              onClick={() => dispatch(toggleRecordBookPopup())}
            >
              <FaWindowClose />
            </button>
          </div>

          {/**MAIN BODY */}
          <div className="flex flex-1 flex-col">
            <div className="mb-2 flex justify-center">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-blue-600 border border-blue-600">
                {book.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <h3 className="text-2xl font-bold leading-tight text-gray-900">{book.title}</h3>
                <p className="mt-2 text-base text-gray-500">
                  by{" "}
                  <span className="font-semibold text-gray-700">{book.author}</span>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleRecordBook}>
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">Enter Borrower Email</div>
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-10 py-2 font-mono border text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <div className="flex justify-center mt-5">
                <button
                type="submit"
                disabled={loading}
                className={`w-3/5 text-white py-2 font-mono rounded-lg transition ${loading? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
              >
                {loading ? "Processing..." : "Record"}
              </button>

              </div>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecordBookPopup;
