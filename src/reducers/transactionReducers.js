import {
  TRANSACTION_INFO_REQUEST,
  TRANSACTION_INFO_SUCCESS,
  TRANSACTION_INFO_FAIL,
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
