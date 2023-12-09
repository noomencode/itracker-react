import {
  TRANSACTION_ADD_REQUEST,
  TRANSACTION_ADD_SUCCESS,
  TRANSACTION_ADD_FAIL,
  TRANSACTION_INFO_REQUEST,
  TRANSACTION_INFO_SUCCESS,
  TRANSACTION_INFO_FAIL,
  TRANSACTION_EDIT_FAIL,
  TRANSACTION_EDIT_REQUEST,
  TRANSACTION_EDIT_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
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
        profit: body.profit,
        expense: body.transactionExpense,
        expenseInEur: body.transactionExpenseInEur,
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

    const { data } = await axios.get("/api/transactions", config);
    dispatch({ type: TRANSACTION_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TRANSACTION_INFO_FAIL });
  }
};

export const editTransaction = (body) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: TRANSACTION_EDIT_REQUEST });

    const { data } = await axios.put(
      `/api/transactions/${body.id}`,
      {
        date: body.date,
        id: body.id,
        type: body.type,
        sharesAmount: body.sharesAmount,
        price: body.price,
        profit: body.profit,
        expense: body.expense,
        expenseInEur: body.expenseInEur,
      },
      config
    );
    dispatch({
      type: TRANSACTION_EDIT_SUCCESS,
      payload: data,
    });
    dispatch(getTransactions());
  } catch (error) {
    dispatch({
      type: TRANSACTION_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTransaction = (selected) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    data: { selected },
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: TRANSACTION_DELETE_REQUEST });

    const { data } = await axios.delete("/api/transactions", config);
    dispatch({
      type: TRANSACTION_DELETE_REQUEST,
      payload: data,
    });
    dispatch({
      type: TRANSACTION_DELETE_SUCCESS,
      payload: data,
    });
    dispatch(getTransactions());
  } catch (error) {
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
