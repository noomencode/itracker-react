import { Card, CardContent, Typography, Divider } from "@mui/material";
import EnhancedTable from "./DataTable";
import React from "react";

const AssetList = (props) => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Assets
          </Typography>
          <Divider />
        </CardContent>
        <EnhancedTable />
      </Card>
    </>
  );
};

export default AssetList;
