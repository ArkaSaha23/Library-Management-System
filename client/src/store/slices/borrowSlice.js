import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BorrowSlice = createSlice({
  name: "borrowBook",
  initialState: {
    loading: false,
    error: null,
    message: null,
    userBorrowedBooks: [], //for users,admin
    allBorrowedBooks: [], //for admin only
  },
  reducers: {
    //RECORD BOOKS
    borrowBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    borrowBookSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    borrowBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //RENEW BOOK
    renewBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    renewBookSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    renewBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //RETURN BOOK
    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //SEE WHICH BOOKS ARE BORROWED BY USER HIMSELF
    seeBorrowedBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    seeBorrowedBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.userBorrowedBooks = action.payload.bookBorrowed;
      state.error = null;
    },
    seeBorrowedBookfailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    //ADMIN WHEN HE WANTS TO SEE ALL THE BORROWED BOOKS
    getAllBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.allBorrowedBooks = action.payload.borrowList;
      state.error = null;
    },
    getAllBorrowedBooksFailed(state, action) {
      ((state.loading = false), (state.error = action.payload));
      state.message = null;
    },

    //ADMIN WHEN HE WANTS TO SEE BOOKS BORROWED BY A PARTICULAR USER
    getBorrowedBooksByUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getBorrowedBooksByUserSuccess(state, action) {
      state.loading = true;
      state.error = null;
      state.userBorrowedBooks = action.payload.bookBorrowed;
      state.message = action.payload.message;
    },
    getBorrowedBooksByUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    //RESET
    resetBorrowSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

//FUNCTIONS
// add/record books
export const borrowBook = ({email,id}) => async (dispatch) => {
  try {
    dispatch(BorrowSlice.actions.borrowBookRequest());
    const res = await axios.post(
      `http://localhost:3504/api/v1/borrow/borrowBook/${id}`,{email},
      {
        withCredentials: true,
        headers:{
          "Content-Type":"application/json",
        },
      },
    );
    dispatch(BorrowSlice.actions.borrowBookSuccess(res.data));
  } catch (err) {
    dispatch(
      BorrowSlice.actions.borrowBookFailed(
        err.response.data.message || "Something went wrong",
      ),
    );
  }
};
//return book
export const returnBook = ({email,id}) => async (dispatch) => {
  try {
    dispatch(BorrowSlice.actions.returnBookRequest());
    const res = await axios.put(
      `http://localhost:3504/api/v1/borrow/returnBook/${id}`,{email},
      {
        withCredentials: true,
        headers:{
          "Content-Type":"application/json",
        },
      },
    );
    dispatch(BorrowSlice.actions.returnBookSuccess(res.data));
  } catch (err) {
    dispatch(
      BorrowSlice.actions.returnBookFailed(
        err.response.data.message || "Something went wrong",
      ),
    );
  }
};

//renew book
export const renewBook = ({email,id}) => async (dispatch) => {
  try {
    dispatch(BorrowSlice.actions. renewBookRequest());
    const res = await axios.put(
      `http://localhost:3504/api/v1/borrow/renewBook/${id}`,{email},
      {
        withCredentials: true,
        headers:{
          "Content-Type":"application/json",
        },
      },
    );
    dispatch(BorrowSlice.actions. renewBookSuccess(res.data));
  } catch (err) {
    dispatch(
      BorrowSlice.actions. renewBookFailed(
        err.response.data.message || "Something went wrong",
      ),
    );
  }
};


//for user to get his borrowed books
export const seeBorrowedBook = () => async (dispatch) => {
  try {
    dispatch(BorrowSlice.actions.seeBorrowedBookRequest());
    const res = await axios.get(
      "http://localhost:3504/api/v1/borrow/seeBorrowedBooks",
      {
        withCredentials: true,
      },
    );
    dispatch(BorrowSlice.actions.seeBorrowedBookSuccess(res.data));
  } catch (err) {
    dispatch(
      BorrowSlice.actions.seeBorrowedBookfailed(
        err.response.data.message || "Something went wrong",
      ),
    );
  }
};

//for ADMIN to get all the borrowed books by all the users
export const getAllBorrowedBooks = () => async (dispatch) => {
  try {
    dispatch(BorrowSlice.actions.getAllBorrowedBooksRequest());
    const res = await axios.get(
      "http://localhost:3504/api/v1/borrow/getAllBorrowedBooks",
      {
        withCredentials: true,
      },
    );
    dispatch(BorrowSlice.actions.getAllBorrowedBooksRequest(res.data));
    dispatch(BorrowSlice.actions.resetBorrowSlice());
  } catch (err) {
    dispatch(
      BorrowSlice.actions.getAllBorrowedBooksFailed(
        err.response.data.message || "Something went wrong",
      ),
    );
  }
};

//for ADMIN to get the books borrowed by a single user
export const getBorrowedBooksByUser = () => async (dispatch) => {
  try {
    dispatch(BorrowSlice.actions.getBorrowedBooksByUserRequest());
    const res = await axios.get(
      "http://localhost:3504/api/v1/borrow/getBorrowedBooksByUser",
      {
        withCredentials: true,
      },
    );
    dispatch(
      BorrowSlice.actions.getBorrowedBooksByUserSuccess(res.data),
      dispatch(BorrowSlice.actions.resetBorrowSlice()),
    );
  } catch (err) {
    dispatch(
      BorrowSlice.actions.getBorrowedBooksByUserFailed(
        err.response.data.message || "Something went wrong",
      ),
    );
  }
};

export const resetBorrowSlice = () => async(dispatch) => {
  dispatch(BorrowSlice.actions.resetBorrowSlice());
};

export default BorrowSlice.reducer;
