import React from "react";
import TransactionsList from "../components/Transaction/TransactionsList";
import StockScroller from "../components/StockScroller";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Loading from "../components/Loading";

const Transactions = () => {
  return (
    <>
      <Box sx={{ margin: 2 }}>
        <Grid container spacing={1}>
          <Grid item lg={12} xs={12}>
            <TransactionsList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Transactions;
