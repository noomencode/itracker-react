import { Card, CardContent, Typography, Divider } from "@mui/material";
import EnhancedTable from "./DataTable";
import React from "react";

const TransactionsList = () => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Transactions
          </Typography>
          <Divider />
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionsList;
