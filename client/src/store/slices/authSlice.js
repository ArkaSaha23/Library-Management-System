import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    //here are the actions which will change the state
    //registration
    regRequest(state) {
      //state can access the fields of initialState
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    regSuccess(state, action) {
      //when user is successfully registered
      state.loading = false;
      state.message = action.payload.message;
    },
    regError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    //otp
    OTPRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    OTPSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    OTPError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    //login
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    //logout
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    //get user
    getUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    getUserError(state, action) {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    //forgot password
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgotPasswordError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    //reset password
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordError(state, action) {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },

    //update password
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    updatePasswordError(state, action) {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },

    //resetAuthSlice
    resetAuthSlice(state) {
      state.loading = false;
      state.message = null;
      state.error = null;
    },
  },
});

export const resetAuthSlice = () => (dispatch) => {
  dispatch(AuthSlice.actions.resetAuthSlice());
};

//inorder to call the above actions we need to call dispatch
//below is a Redux Thunk (middleware function).allows API Calls
export const register = (data) => async (dispatch) => {
  //data=what we send
  dispatch(AuthSlice.actions.regRequest());
  //here loading=true,spinner starts

  await axios //API call
    .post("http://localhost:3504/api/v1/auth/register", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    //res.data=what backend sends us
    .then((res) => {
      dispatch(AuthSlice.actions.regSuccess(res.data));
    })
    .catch((err) => {
      dispatch(AuthSlice.actions.regError(err.response.data.message || "Something went wrong"));
    });
};

export const OTPverification = ({email, OTP}) => async (dispatch) => {
  dispatch(AuthSlice.actions.OTPRequest());
  //here loading=true,spinner starts

  await axios //API call
    .post(
      "http://localhost:3504/api/v1/auth/verifyOTP",
      { email, OTP },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(AuthSlice.actions.OTPSuccess(res.data));
    })
    .catch((err) => {
      dispatch(AuthSlice.actions.OTPError(err.response.data.message || "Something went wrong"));
    });
};

export const login = ({email, password}) => async (dispatch) => {
  dispatch(AuthSlice.actions.loginRequest());
  //here loading=true,spinner starts

  await axios //API call
    .post(
      "http://localhost:3504/api/v1/auth/login",
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(AuthSlice.actions.loginSuccess(res.data)); //
    })
    .catch((err) => {
      dispatch(AuthSlice.actions.loginError(err.response.data.message || "Something went wrong"));
    });
};

export const logout = () => async (dispatch) => {
  dispatch(AuthSlice.actions.logoutRequest());
  //here loading=true,spinner starts

  await axios //API call
    .get("http://localhost:3504/api/v1/auth/logout", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(AuthSlice.actions.logoutSuccess(res.data));
      dispatch(AuthSlice.actions.resetAuthSlice());
    })
    .catch((err) => {
      dispatch(AuthSlice.actions.logoutError(err.response.data.message || "Something went wrong"));
    });
};

export const getUser = () => async (dispatch) => {
  dispatch(AuthSlice.actions.getUserRequest());
  //here loading=true,spinner starts

  await axios //API call
    .get("http://localhost:3504/api/v1/auth/me", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(AuthSlice.actions.getUserSuccess(res.data));
    })
    .catch((err) => {
      dispatch(AuthSlice.actions.getUserError(err.response.data.message || "Something went wrong"));
    });
};

export const forgetPassword = ({email}) => async (dispatch) => {
  dispatch(AuthSlice.actions.forgotPasswordRequest());
  //here loading=true,spinner starts

  await axios //API call
    .post(
      "http://localhost:3504/api/v1/auth/forgotpassword",
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(AuthSlice.actions.forgotPasswordSuccess(res.data));
    })
    .catch((err) => {
      dispatch(
        AuthSlice.actions.forgotPasswordError(err.response.data.message || "Something went wrong"),
      );
    });
};

export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(AuthSlice.actions.resetPasswordRequest());
  //here loading=true,spinner starts

  await axios //API call
    .put(`http://localhost:3504/api/v1/auth/resetpassword/${token}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(AuthSlice.actions.resetPasswordSuccess(res.data));
    })
    .catch((err) => {
      dispatch(AuthSlice.actions.resetPasswordError(err.response.data.message || "Something went wrong"));
    });
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(AuthSlice.actions.updatePasswordRequest());
  //here loading=true,spinner starts

  await axios //API call
    .put("http://localhost:3504/api/v1/auth/updatepassword", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(AuthSlice.actions.updatePasswordSuccess(res.data));
    })
    .catch((err) => {
      dispatch(AuthSlice.actions.updatePasswordError(err.response.data.message || "Something went wrong"));
    });
};