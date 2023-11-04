import {
  TRANSACTION_INFO_REQUEST,
  TRANSACTION_INFO_SUCCESS,
  TRANSACTION_INFO_FAIL,
  TRANSACTION_ADD_FAIL,
  TRANSACTION_ADD_REQUEST,
  TRANSACTION_ADD_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_EDIT_FAIL,
  TRANSACTION_EDIT_REQUEST,
  TRANSACTION_EDIT_SUCCESS,
} from "../constants/transactionConstants";

export const transactionReducer = (state = { transactions: [] }, action) => {
  switch (action.type) {
    case TRANSACTION_INFO_REQUEST:
      return { loading: true };
    case TRANSACTION_INFO_SUCCESS:
      return { loading: false, transactions: action.payload };
    case TRANSACTION_INFO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const transactionCUDReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_ADD_REQUEST:
    case TRANSACTION_EDIT_REQUEST:
    case TRANSACTION_DELETE_REQUEST:
      return { loading: true };
    case TRANSACTION_ADD_SUCCESS:
      return {
        loading: false,
        type: "create",
        assetCUDPayload: action.payload,
      };
    case TRANSACTION_EDIT_SUCCESS:
      return {
        loading: false,
        type: "update",
        assetCUDPayload: action.payload,
      };
    case TRANSACTION_DELETE_SUCCESS:
      return {
        loading: false,
        type: "delete",
        assetCUDPayload: action.payload,
      };
    case TRANSACTION_ADD_FAIL:
    case TRANSACTION_EDIT_FAIL:
    case TRANSACTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
