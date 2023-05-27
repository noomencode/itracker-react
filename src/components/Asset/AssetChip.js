import React from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { styled, keyframes } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";

const Item = styled(Chip)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(0.5),
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
    <Typography
      variant="span"
      sx={{
        fontWeight: 600,
        fontSize: { xs: "0.9em", sm: "1.1em" },
        // display: { xs: "inline-flex" },
        // maxWidth: { xs: "50%" },
        // overflow: { xs: "hidden" },
      }}
    >
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
        height: height,
        width: width,
      }}
      color={dailyChange > 0 ? "secondary" : "error"}
      variant="outlined"
      label={`${dailyChange} %`}
    />
  );
};

const MarketClosedChip = () => {
  return (
    // <Chip
    //   sx={{
    //     borderRadius: "10px",
    //     height: "1.5em",
    //     width: "4.5em",
    //     ml: 1,
    //   }}
    //   color={"warning"}
    //   variant="outlined"
    //   label={<LockIcon color={"warning"}/>}
    // />
    <LockIcon color={"warning"} sx={{ fontSize: "1em", ml: 1 }} />
  );
};

const AssetChip = (props) => {
  const { currentPrice, dailyChange, assetName, miniChip, tradeable } = props;
  return (
    <>
      <Item
        variant="outlined"
        sx={{
          height: miniChip ? "4em" : "5em",
          width: miniChip ? "250px" : null,
        }}
        label={
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <PrimaryText assetName={assetName}></PrimaryText>
              {!miniChip && !tradeable ? <MarketClosedChip /> : null}
              <SecondaryText
                currentPrice={currentPrice}
                dailyChange={dailyChange}
              ></SecondaryText>
            </Grid>
            <Grid item>
              <PercentageChip
                dailyChange={dailyChange}
                height={miniChip ? "3em" : "3em"}
                width={miniChip ? "5em" : "6em"}
              />
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default AssetChip;
