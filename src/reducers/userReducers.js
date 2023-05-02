import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_CHANGEPW_FAIL,
  USER_CHANGEPW_REQUEST,
  USER_CHANGEPW_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (
  state = { userInfo: { isAuthenticated: false } },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { userInfo: { isAuthenticated: false } };
    default:
      return state;
  }
};

export const changePwReducer = (state = { changePwRequest: {} }, action) => {
  switch (action.type) {
    case USER_CHANGEPW_REQUEST:
      return { ...state, loading: true };
    case USER_CHANGEPW_SUCCESS:
      return {
        loading: false,
        changePwRequest: action.payload,
      };
    case USER_CHANGEPW_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
