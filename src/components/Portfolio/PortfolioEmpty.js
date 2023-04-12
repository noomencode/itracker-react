import React from "react";
import AssetForm from "../Asset/AssetForm";
import { Card, CardContent, Typography, Divider } from "@mui/material";

const PortfolioEmpty = ({ component }) => {
  return (
    <>
      <Card>
        {component === "AssetList" ? (
          <CardContent>
            <Typography
              variant="h6"
              component="h6"
              color="text.primary"
              fontWeight={800}
              gutterBottom
            >
              First step: Add some assets to your portfolio.
            </Typography>
            <Divider />
            <AssetForm />
          </CardContent>
        ) : (
          <CardContent>
            <Typography
              variant="h6"
              component="h6"
              color="text.primary"
              fontWeight={800}
              gutterBottom
            >
              Once you add something to your asset you will start seeing your
              overall portfolio performance here.
            </Typography>
            <Divider sx={{ marginBottom: 10 }} />
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default PortfolioEmpty;
