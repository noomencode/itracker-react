import { Card, CardContent, Typography, Divider } from "@mui/material";
import TransactionsTable from "./TransactionsTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../actions/transactionActions";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactionsList);
  let rows;

  if (transactions?.length) {
    rows = transactions.map((tr, index) => {
      const { date, type, amount, expense, price, asset } = tr;
      return {
        asset: asset.name,
        date: date,
        type: type,
        amount: amount,
        expense: expense,
        price: price,
        key: index,
      };
    });
    console.log(rows);
  }

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Transactions
          </Typography>
          <Divider />
        </CardContent>
        {rows?.length ? <TransactionsTable rows={rows} /> : null}
      </Card>
    </>
  );
};

export default TransactionsList;