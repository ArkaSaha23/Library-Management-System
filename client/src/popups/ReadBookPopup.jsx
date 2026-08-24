import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";

const ReadBookPopup = ({ book,hasReturned }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.authReducer);
  console.log("hasReturned :", hasReturned);

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const day = `${String(date.getDate()).padStart(2, "0")}`;
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    const year = `${String(date.getFullYear())}`;
    const addedDate = `${day}-${month}-${year}`;
    return addedDate;
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
        <div className="w-11/12 rounded-lg bg-white shadow-lg sm:w-1/2 md:w-2/3">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-black px-6 py-4 text-white">
            <h2 className="text-lg font-bold">View Book Info</h2>
            <button
              className="text-xl font-bold text-white cursor-pointer"
              onClick={() => dispatch(toggleReadBookPopup())}
            >
              <FaWindowClose />
            </button>
          </div>
          {/**Body part */}
          <div className="max-h-[70vh] overflow-y-auto bg-white px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-7 sm:flex-row">
              {/**  Book Details */}
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex justify-center">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-blue-600 border border-blue-600">
                    {book.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight text-gray-900">{book.title}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      by{" "}
                      <span className="font-semibold text-gray-700">{book.author}</span>
                    </p>
                  </div>
                  {isAuthenticated && user.role === "Admin" && (
                    <div className="mt-2 md:text-right mr-5">
                      <p className="text-xs font-medium uppercase px-2 tracking-wide text-gray-400">Book ID</p>
                      <p className="text-xs md:text-lg mt-1 px-2 font-semibold text-gray-800">{book._id}</p>
                    </div>
                  )}
                </div>
                {/** Divider */}
                <div className="my-5 border-t border-gray-300"></div>

                {/* Information of the Book */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {isAuthenticated && user?.role === "Admin" && (
                    <>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Quantity Available</p>
                        <p className="mt-1 font-semibold text-gray-800">{book.quantityAvailable}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Added Date</p>
                        <p className="mt-1 font-semibold text-gray-800">{formatDate(book.AddedDate)}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Edition</p>
                    <p className="mt-1 font-semibold text-gray-800">{book.edition}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Language</p>
                    <p className="mt-1 font-semibold text-gray-800">{book.language}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Publisher</p>
                    <p className="mt-1 font-semibold text-gray-800">{book.publisher}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Published</p>
                    <p className="mt-1 font-semibold text-gray-800">{book.publishedYear}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Pages</p>
                    <p className="mt-1 font-semibold text-gray-800">{book.pages}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Price</p>
                    <p className="mt-1 font-semibold text-gray-800">{book.price}</p>
                  </div>
                </div>

                {user?.role === "User" && !hasReturned && (
                  <div className="mt-5 flex justify-center items-center">
                    <h1 className="py-1 px-2 bg-red-200 font-semibold text-red-600 border rounded-full">Currently Borrowed</h1>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-7 rounded-lg bg-gray-300 p-5">
              <h4 className="mb-2 text-xl text-center font-bold uppercase tracking-wide text-gray-700">
                About this book
              </h4>

              <p className="text-md leading-6 text-gray-700">
                {book.description}
              </p>
            </div>
          </div>

          {/* Popup Footer */}
          <div className="flex items-center justify-end gap-3 rounded-b-lg border-t border-gray-200 bg-gray-50 px-6 py-4 sm:px-8">
            <button
              onClick={() => dispatch(toggleReadBookPopup())}
              className="cursor-pointer rounded-md border  bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadBookPopup;
