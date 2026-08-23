import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { returnBook } from "../store/slices/borrowSlice";


const ReturnBookPopup = ({email,bookId}) => {
  console.log("Return Book id in Return Book popup component",bookId);
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.borrowReducer);

  const handleReturnBook = (e) =>{
    e.preventDefault();
    dispatch(returnBook({ email, bookId }));
  }
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
        <div className="w-11/12 rounded-lg bg-white shadow-lg sm:w-1/2">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-black px-6 py-4 text-white">
            <h2 className="text-lg font-bold">Return Book</h2>

            <button
              className="text-xl font-bold text-white cursor-pointer"
              onClick={() => dispatch(toggleReturnBookPopup())}
            >
              <FaWindowClose />
            </button>
          </div>

          {/**Main Body */}
          <form onSubmit={handleReturnBook}>
            <div className="py-3 px-2 border border-gray-300 rounded-2xl bg-gray-100">
              <div className="py-2 text-center font-mono">Enter Borrower Email</div>
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                defaultValue={email}
                required
                className="w-full px-10 py-2 font-mono border text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <div className="flex justify-center mt-5">
                <button
                type="submit"
                disabled={loading}
                className={`w-3/5 text-white py-2 font-mono rounded-lg transition ${loading? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
              >
                {loading ? "Processing..." : "Return Book"}
              </button>

              </div>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReturnBookPopup;
