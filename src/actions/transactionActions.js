import {
  TRANSACTION_ADD_REQUEST,
  TRANSACTION_ADD_SUCCESS,
  TRANSACTION_ADD_FAIL,
  TRANSACTION_INFO_REQUEST,
  TRANSACTION_INFO_SUCCESS,
  TRANSACTION_INFO_FAIL,
} from "../constants/transactionConstants";
import axios from "axios";

export const createTransaction = (body) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: TRANSACTION_ADD_REQUEST });

    const transaction = await axios.post(
      "/api/transactions",
      {
        ticker: body.ticker,
        date: body.date,
        type: body.type,
        amount: body.transactionAmount,
        price: body.price,
        expense: body.transactionExpense,
      },
      config
    );
    dispatch({ type: TRANSACTION_ADD_SUCCESS, payload: transaction });
  } catch (error) {
    dispatch({ type: TRANSACTION_ADD_FAIL });
  }
};

export const getTransactions = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: TRANSACTION_INFO_REQUEST });

    const transaction = await axios.get("/api/transactions", config);
    dispatch({ type: TRANSACTION_INFO_SUCCESS, payload: transaction });
  } catch (error) {
    dispatch({ type: TRANSACTION_INFO_FAIL });
  }
};
