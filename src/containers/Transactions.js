import React from "react";
import TransactionsList from "../components/Transaction/TransactionsList";
import StockScroller from "../components/StockScroller";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Loading from "../components/Loading";
import LatestTransactions from "../components/Transaction/LatestTransactions";

const Transactions = () => {
  return (
    <>
      <Box sx={{ margin: 2 }}>
        <Grid container spacing={1}>
          <Grid item lg={9} xs={12}>
            <TransactionsList />
          </Grid>
          <Grid item lg={3} xs={12}>
            <LatestTransactions />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Transactions;
