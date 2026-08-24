import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { returnBook } from "../store/slices/borrowSlice";
import { CheckCircle2 } from "lucide-react";


const ReturnBookPopup = ({email,book,borrowId}) => {
  console.log("Return Book id in Return Book popup component",book);
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.borrowReducer);
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);

  console.log("bookId received from the myBorrowed books:",book)
  console.log("borrowId from the myBorrowed books",borrowId)

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const day = `${String(date.getDate()).padStart(2, "0")}`;
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    const year = `${String(date.getFullYear())}`;
    const finalDate = `${day}-${month}-${year}`;
    return `${finalDate}`;
  };

  const handleReturnBook = (e) =>{
    e.preventDefault();
    dispatch(returnBook({ email, book }));
  }
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
        <div className="w-11/12 max-h-[100vh] overflow-y-auto rounded-lg bg-white shadow-lg sm:w-1/2">
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
          {isAuthenticated && user?.role === "Admin" && (
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
          )}
        
          {/* USER RETURN DETAILS */}
         {isAuthenticated && user?.role === "User" && borrowId && (
          <div className="p-5">
            <div className="mb-2 flex flex-col items-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
              <h3 className="mt-2 text-lg font-bold text-gray-800">Book Returned Successfully</h3>
            </div>
            <div className="rounded-lg border border-dashed border-gray-400 bg-gray-50 p-4">

              <div className="mb-4 text-center border-b border-dashed border-gray-300 pb-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Book</p>
                <h3 className="mt-1 text-lg font-bold text-gray-800">{borrowId.BookName}</h3>
              </div>

              {/**Borrower Info */}
              <div className="mb-4 flex justify-between items-center">
                <p className="text-xs uppercase tracking-wide text-gray-500">Borrower</p>
                <p className=" font-semibold text-gray-800">{borrowId.UserName}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Borrow ID</span>
                  <span className="text-right font-mono text-xs font-semibold text-gray-800">{borrowId.borrowId}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Borrowed Date</span>
                  <span className="font-semibold text-gray-800">{formatDate(borrowId.borrowedDate)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Due Date</span>
                  <span className="font-semibold text-gray-800">{formatDate(borrowId.Duedate)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Returned Date</span>
                  <span className="font-semibold text-gray-800">{formatDate(borrowId.ReturnedDate)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="font-semibold text-gray-800">₹{book.price}</span>
                </div>

                <div className="flex items-center justify-between">
                <span className="text-gray-700">Late Fine</span>
                <span className={`font-bold ${borrowId.fine > 0 ? "text-red-600" : "text-green-600"}`}>
                  ₹{borrowId.fine}
                </span>
              </div>
              </div>

              {/**Divider */}
              <div className="my-2 border-t border-dashed border-gray-400" />

              {/** Fine */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Total Amount</span>
                <span className="font-bold text-gray-700">
                  ₹{borrowId.fine + book.price}
                </span>
              </div>

              {/** status */}
              <div className="mt-4 flex items-center justify-between rounded-lg bg-green-100 px-3 py-2">
                <span className="text-sm font-semibold text-green-800">Status</span>
                <span className="text-sm font-bold text-green-700">RETURNED</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-400">Please keep this receipt for your records.</p>
              <button
                onClick={() => dispatch(toggleReturnBookPopup())}
                className="mt-2 w-full cursor-pointer rounded-lg bg-black py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default ReturnBookPopup;
