import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";
import { AddBooks, getAllBooks } from "../store/slices/bookSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const { loading} = useSelector((state) => state.bookReducer);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    edition: "1st Edition",
    price: "",
    category: "",
    language: "",
    quantityAvailable: "",
    pages: "",
    publisher: "",
    publishedYear: "",
  });

  const bookFields = [
    { name: "title", label: "Title of the Book", type: "text" },
    { name: "author", label: "Author of the Book", type: "text" },
    { name: "description", label: "Description of the Book", type: "text" },
    { name: "edition", label: "Current Edition", type: "text" },
    {
      name: "price",
      label: "Price of the Book(Borrowing Price/day)",
      type: "number",
    },
    { name: "category", label: "Category", type: "text" },
    { name: "language", label: "Language", type: "text" },
    {
      name: "quantityAvailable",
      label: "Quantity Available for the Book",
      type: "number",
    },
    { name: "pages", label: "No of Pages", type: "number" },
    { name: "publisher", label: "Publisher", type: "text" },
    { name: "publishedYear", label: "Published Year", type: "number" },
  ];

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    const bookInformation = new FormData();

    Object.entries(bookData).forEach(([key, value]) => {
      bookInformation.append(key, value);
    });
    dispatch(AddBooks(bookInformation));
    dispatch(getAllBooks());
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
        <div className="w-11/12 rounded-lg bg-white shadow-lg lg:w-3/5">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-black px-6 py-4 text-white">
            <h2 className="text-lg font-bold">Add New Book</h2>

            <button
              className="text-xl font-bold text-white cursor-pointer"
              onClick={() => dispatch(toggleAddBookPopup())}
            >
              <FaWindowClose />
            </button>
          </div>
          <h3 className="w-full flex justify-center mt-5 text-lg font-semibold">
            Enter the Book Details below
          </h3>

          {/**Book Details */}
          <form onSubmit={handleAddBookSubmit} className="space-y-4">
            <div className="max-h-[70vh] overflow-y-auto bg-white px-6 py-6 sm:px-8">
              <div className="flex justify-center flex-col gap-7 sm:flex-row">
                <div className="w-full border border-gray-300 rounded-2xl">
                  {bookFields.map((field, index) => (
                    <div
                      className="m-2 p-2 rounded-lg bg-gray-200 border border-gray-400"
                      key={index}
                    >
                      <label className="py-2 text-center font-bold">
                        {field.label}
                      </label>
                      {field.name === "description" ? (
                        <textarea
                          name={field.name}
                          value={bookData[field.name]}
                          placeholder="Enter Data Here"
                          rows={5}
                          onChange={(e) =>
                            setBookData({
                              ...bookData,
                              [field.name]: e.target.value,
                            })
                          }
                          className="w-full mt-2 px-4 py-2 font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={bookData[field.name]}
                          placeholder="Enter Data Here"
                          onChange={(e) =>
                            setBookData({
                              ...bookData,
                              [field.name]: e.target.value,
                            })
                          }
                          className="w-full mt-2 px-4 py-2 font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                disabled={loading}
                className={`w-3/5 mb-5 text-white py-2 font-mono rounded-lg transition ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
              >
                {loading ? "Processing..." : "Add this Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBookPopup;
