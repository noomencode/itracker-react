import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import AllocationChart from "./AllocationChart";

const Allocation = (props) => {
  const [open, setOpen] = useState(false);
  const portfolio = props.portfolio;
  const portfolioAssets = props.assets[0];

  const calculateAllocation = (category) => {
    const assetsAmount = portfolioAssets.assets.length;
    const totalValue = portfolio.totalWorth;
    const data = [];

    portfolioAssets.assets.forEach((ass) => {
      const assetValue = ass.sharesAmount * ass.asset.price;
      console.log(assetValue);
      data.name = category;
      if (data[ass.asset[category]]) {
        data[ass.asset[category]] += assetValue;
      } else {
        data[ass.asset[category]] = assetValue;
      }
    });
    Object.keys(data).forEach((key) => {
      if (key !== "name") {
        data[key] = parseFloat(((data[key] / totalValue) * 100).toFixed(1));
      }
    });
    const dataInPercentages = [];
    dataInPercentages.push({ ...data });
    return dataInPercentages;
  };

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography
            variant="h5"
            color="text.primary"
            gutterBottom
            sx={{ display: "flex" }}
          >
            Portfolio allocation
            {open ? (
              <KeyboardDoubleArrowUpIcon
                sx={{ display: "flex", cursor: "pointer" }}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            ) : (
              <KeyboardDoubleArrowDownIcon
                sx={{ display: "flex", cursor: "pointer" }}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            )}
          </Typography>
          {open ? (
            <>
              <Divider sx={{ mb: 1 }} />
              <AllocationChart
                title="Region"
                data={calculateAllocation("region")}
              />
              <AllocationChart
                title="Type"
                data={calculateAllocation("type")}
              />
              <AllocationChart
                title="Characteristics"
                data={calculateAllocation("customType")}
              />
            </>
          ) : null}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Allocation;
