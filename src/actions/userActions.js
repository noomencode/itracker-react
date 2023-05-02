import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_CHANGEPW_REQUEST,
  USER_CHANGEPW_SUCCESS,
  USER_CHANGEPW_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      // "https://weary-peplum-hare.cyclic.app/api/users/login",
      "/api/users/login",
      { email, password }
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // ADD USER TO SESSION HERE...
    sessionStorage.setItem("userInfo", JSON.stringify(data));
    sessionStorage.setItem("token", JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      dispatch({
        type: USER_CHANGEPW_REQUEST,
      });

      const { data } = await axios.post(
        "/api/users/changePassword",
        {
          oldPassword,
          newPassword,
        },
        config
      );

      dispatch({
        type: USER_CHANGEPW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_CHANGEPW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logOut = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  sessionStorage.clear();
};
