import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    //ADD BOOKS
    addBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    addBookfailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //GET BOOKS
    getBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.books = action.payload.books;
      state.error = null;
    },
    getBookfailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    //UPDATE BOOKS
    updateBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateBookSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    updateBookfailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //DELETE BOOKS
    deleteBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteBookSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    deleteBookfailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //RESET
    resetBookSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

//functions
export const getAllBooks = () => async (dispatch) => {
  try {
    dispatch(BookSlice.actions.getBookRequest());

    const res = await axios.get(
      "http://localhost:3504/api/v1/books/getAllBook",
      {
        withCredentials: true,
      },
    );
    console.log(res.data);
    dispatch(BookSlice.actions.getBookSuccess(res.data));
  } catch (err) {
    dispatch(
      BookSlice.actions.getBookfailed(
        err.response.data.message || "SomeThing Gone wrong",
      ),
    );
    toast.error(err.response.data.message);
  }
};

export const AddBooks = (bookInformation) => async (dispatch) => {
  try {
    dispatch(BookSlice.actions.addBookRequest());

    const res = await axios.post(
      "http://localhost:3504/api/v1/books/admin/addBook",
      bookInformation,
      {
        withCredentials: true,
        header: { "Content-Type": "application/json" },
      },
    );
    console.log(res.data);
    dispatch(BookSlice.actions.addBookSuccess(res.data));
  } catch (err) {
    dispatch(
      BookSlice.actions.addBookfailed(
        err.response.data.message || "SomeThing Gone Wrong",
      ),
    );
  }
};

export const updateBooks = (id) => async (dispatch) => {
  try {
    dispatch(BookSlice.actions.updateBookRequest());

    const res = await axios.patch(
    `http://localhost:3504/api/v1/books/admin/updateBook/${id}`,
      bookInformation,
      {
        withCredentials: true,
        header: { "Content-Type": "application/json" },
      },
    );
    console.log(res.data);
    dispatch(BookSlice.actions.updateBookSuccess(res.data));
  } catch (err) {
    dispatch(
      BookSlice.actions. updateBookfailed(
        err.response.data.message || "SomeThing Gone Wrong",
      ),
    );
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch(BookSlice.actions.deleteBookRequest());

    const res = await axios.delete(
      `http://localhost:3504/api/v1/books/admin/deleteBook/${id}`,
      bookInformation,
      {
        withCredentials: true,
        header: { "Content-Type": "application/json" },
      },
    );
    console.log(res.data);
    dispatch(BookSlice.actions.deleteBookSuccess(res.data));
  } catch (err) {
    dispatch(
      BookSlice.actions.deleteBookfailed(
        err.response.data.message || "SomeThing Gone Wrong",
      ),
    );
  }
};

export const resetBookSlice = () => (dispatch) =>{
  dispatch(BookSlice.actions.resetBookSlice());
};

export default BookSlice.reducer;
