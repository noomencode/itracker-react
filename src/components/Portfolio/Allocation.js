import React, { useState } from "react";
import { Box, Divider, Typography, CardContent } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import AllocationChart from "./AllocationChart";
import { useTheme } from "@mui/material/styles";

const Allocation = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { performance } = props;
  const portfolioAssets = props.assets[0];

  const calculateAllocation = (category) => {
    const totalValue = performance.valueWithCrypto;
    const data = [];
    let totalValue2 = 0;

    portfolioAssets.assets.forEach((ass) => {
      const assetValue = ass.sharesAmount * ass.asset.priceInEur;
      totalValue2 += assetValue;
      // console.log(ass.asset.name + " " + assetValue);

      data.name = category;
      if (category === "customType" && data[ass[category]]) {
        data[ass[category]] += assetValue;
      } else if (category === "customType") {
        data[ass[category]] = assetValue;
      } else if (data[ass.asset[category]]) {
        data[ass.asset[category]] += assetValue;
      } else if (category !== "customType") {
        data[ass.asset[category]] = assetValue;
      }
    });
    Object.keys(data).forEach((key) => {
      if (key !== "name") {
        data[key] = parseFloat(
          Math.floor((data[key] / totalValue) * 100).toFixed(1)
        );
      }
    });
    const dataInPercentages = [];
    dataInPercentages.push({ ...data });
    console.log(totalValue2);
    return dataInPercentages;
  };

  return (
    <Box sx={{ margin: "5px" }}>
      {/* <Card sx={{ marginBottom: 1 }}> */}
      <CardContent
        sx={{
          p: 1,
          background: open ? undefined : theme.palette.customGradientBackground,
          borderRadius: "5px",
        }}
      >
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
          <Box
            sx={{
              background: theme.palette.customGradientBackground,
              p: 2,
              mb: "5px",
              borderRadius: "5px",
            }}
          >
            {/* <Divider sx={{ mb: 1 }} /> */}
            <AllocationChart
              title="Region"
              data={calculateAllocation("region")}
            />
            <AllocationChart title="Type" data={calculateAllocation("type")} />
            <AllocationChart
              title="Characteristics"
              data={calculateAllocation("customType")}
            />
          </Box>
        ) : null}
      </CardContent>
      {/* </Card> */}
    </Box>
  );
};

export default Allocation;
