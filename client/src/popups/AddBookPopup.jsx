import React from "react";
import { useDispatch } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
        <div className="w-11/12 rounded-lg bg-white shadow-lg sm:w-1/2">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-black px-6 py-4 text-white">
            <h2 className="text-lg font-bold">Add Book Details</h2>

            <button
              className="text-xl font-bold text-white cursor-pointer"
              onClick={() => dispatch(toggleAddBookPopup())}
            >
              <FaWindowClose />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBookPopup;
