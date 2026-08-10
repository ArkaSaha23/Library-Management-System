import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    fetchAllUserRequest(state) {
      state.loading = true;
    },
    fetchAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.alluser;
    },
    fetchAllUsersFailed(state) {
      state.loading = false;
    },
    addNewAdminRequest(state) {
      state.loading = true;
    },
    addNewAdminSuccess(state) {
      state.loading = false;
    },
    addNewAdminFailed(state) {
      state.loading = false;
    },
  },
});
/*
1.  export const func_name = (argumnets)=> (argumnets) => {}
2.  export function func_name(arguments) {
      return function (arguments) {
      };
    }
eg: export const fetchAlluser = () =>
      async (dispatch) => {
       // code
      };
      
    export function fetchAlluser() {
      return async function (dispatch) {
        // code
      };
    }
  */
export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(UserSlice.actions.fetchAllUserRequest());
    const res = await axios.get(
      "http://localhost:3504/api/v1/user/getAllUsers",

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(UserSlice.actions.fetchAllUsersSuccess(res.data));
    toast.success(res.data.message);
  } catch (err) {
    dispatch(
      UserSlice.actions.fetchAllUsersFailed(
        err.response.data.message || "Something went wrong",
      ),
      toast.error(err.response.data.message),
    );
  }
};

export const addNewAdmin = (formData) => async (dispatch) => {
  try {
    dispatch(UserSlice.actions.addNewAdminRequest());

    const res = await axios.get(
      "http://localhost:3504/api/v1/user/RegisterNewAdmin",
      formData,
      {
        withCredentials: true,
        //hearder:{}not required as we are not sending any data or request body
      },
    );
    dispatch(UserSlice.actions.addNewAdminSuccess());
    toast.success(res.data.message);
  } catch (err) {
    dispatch(
      UserSlice.actions.addNewAdminFailed(
        err.response.data.message || "Something went wrong",
      ),
      toast.error(err.response.data.message),
    );
  }
};


export default UserSlice.reducer;