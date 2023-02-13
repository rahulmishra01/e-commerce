import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADUSER_REQUEST,
  LOADUSER_SUCCESS,
  LOADUSER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../action_type/type";
import axios from "axios";

// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/login",
      {
        email,
        password,
      },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/from-data" } };
    const { data } = await axios.post("/api/register", userData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

// Load user
export const Loaduser = () => async (dispatch) => {
  try {
    dispatch({ type: LOADUSER_REQUEST });
    const { data } = await axios.get("/api/me");
    dispatch({ type: LOADUSER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOADUSER_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const Logout = () => async (dispatch) => {
  try {
    await axios.get("/api/logout/");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "multipart:from/data" } };
    const { data } = await axios.put(
      "/api/update/profile/",
      updateData,
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update Password
export const UpdatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/update", passwords);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const ForgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post("/api/forgot/", email);
    console.log("🚀 ~ file: userAction.js:120 ~ ForgotPassword ~ data", data);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    console.log(
      "🚀 ~ file: userAction.js:122 ~ ForgotPassword ~ message",
      data.message
    );
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      error: error.response.data.message,
    });
  }
};

// Reset Password
export const ResetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const { data } = await axios.put(`/api/password/reset/${token}`, passwords);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    console.log("🚀 ~ file: userAction.js:135 ~ ResetPassword ~ data", data);
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      error: error.response.data.message,
    });
  }
};

// clearing error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
