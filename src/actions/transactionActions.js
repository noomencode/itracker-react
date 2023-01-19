import {
  TRANSACTION_ADD_REQUEST,
  TRANSACTION_ADD_SUCCESS,
  TRANSACTION_ADD_FAIL,
} from "../constants/transactionConstants";
import axios from "axios";

export const createTransaction = (body) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_ADD_REQUEST });

    const transaction = await axios.post("/api/transactions", {
      ticker: body.ticker,
      date: body.date,
      type: body.type,
      amount: body.sharesAmount,
      price: body.price,
    });
    dispatch({ type: TRANSACTION_ADD_SUCCESS, payload: transaction });
  } catch (error) {
    dispatch({ type: TRANSACTION_ADD_FAIL });
  }
};
