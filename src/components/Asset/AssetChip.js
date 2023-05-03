import React from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { styled, keyframes } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Item = styled(Chip)(({ theme }) => ({
  //position: "relative",
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
  // height: "5em",
  display: "flex",
  justifyContent: "space-between",
  "& .MuiChip-label": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const PrimaryText = (props) => {
  const { assetName } = props;
  return (
    <Typography variant="span" sx={{ fontWeight: 600 }}>
      {assetName}
    </Typography>
  );
};

const SecondaryText = (props) => {
  const { currentPrice, dailyChange } = props;
  const priceDiff = ((currentPrice * dailyChange) / 100).toFixed(2);
  return (
    <Typography
      color={dailyChange > 0 ? "secondary.main" : "error.main"}
      variant="h6"
    >{`${currentPrice} (${priceDiff})`}</Typography>
  );
};

const PercentageChip = (props) => {
  const { dailyChange, height, width } = props;
  return (
    <Chip
      sx={{
        borderRadius: "10px",
        height: height ? height : "3em",
        width: width ? width : "6em",
      }}
      color={dailyChange > 0 ? "secondary" : "error"}
      variant="outlined"
      label={`${dailyChange} %`}
    />
  );
};

const AssetChip = (props) => {
  const {
    currentPrice,
    dailyChange,
    assetName,
    height,
    width,
    percentageHeight,
    percentageWidth,
  } = props;
  return (
    <>
      <Item
        variant="outlined"
        sx={{
          height: height ? height : "5em",
          width: width ? width : null,
        }}
        label={
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <PrimaryText assetName={assetName}></PrimaryText>
              <SecondaryText
                currentPrice={currentPrice}
                dailyChange={dailyChange}
              ></SecondaryText>
            </Grid>
            <Grid item>
              <PercentageChip
                dailyChange={dailyChange}
                height={percentageHeight}
                width={percentageWidth}
              />
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default AssetChip;
