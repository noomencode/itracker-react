import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { formFields } from "../../utilities/formFields";
import Form from "../Form";

const PortfolioEmpty = ({ component }) => {
  return (
    <>
      <Card>
        {component === "AssetList" ? (
          <CardContent>
            <Typography
              variant="h5"
              component="h6"
              color="text.primary"
              fontWeight={800}
              gutterBottom
            >
              First step: Add some assets to your portfolio.
            </Typography>
            <Divider />
            {/* <AssetForm mode="emptyPortfolio" /> */}
            <Form
              formType="Add"
              formContext="portfolio"
              fields={formFields["portfolio"].add}
              formTitle="Add new asset"
            />
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
