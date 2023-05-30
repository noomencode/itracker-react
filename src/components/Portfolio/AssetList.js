import { Card, CardContent, Typography, Divider } from "@mui/material";
import EnhancedTable from "./DataTable";
import React from "react";

const AssetList = (props) => {
  const { assets } = props;
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Assets
          </Typography>
          <Divider />
        </CardContent>
        <EnhancedTable assets={{ assets }} />
      </Card>
    </>
  );
};

export default AssetList;
