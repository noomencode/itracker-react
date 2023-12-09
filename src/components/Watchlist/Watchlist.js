import { Box, CardContent, Typography, Divider } from "@mui/material";
import React, { useEffect } from "react";
import WatchlistTable from "./WatchlistTable";
import { useDispatch, useSelector } from "react-redux";
import { getWatchlistAssets } from "../../actions/watchlistActions";

const Watchlist = (props) => {
  let rows;
  const { watchlistAssets } = props;

  if (watchlistAssets?.length) {
    rows = watchlistAssets[0].assets.map((ass, index) => {
      const { asset } = ass;
      return {
        name: asset.name,
        ticker: asset.ticker,
        price: asset.price || "N/A",
        change: asset.dailyChange?.toFixed(2) || "N/A",
        targetPrice: ass.targetPrice?.toFixed(2) || "N/A",
        targetPercentage: ass.targetPrice
          ? `${-(100 - (ass.targetPrice / asset.price) * 100).toFixed(2)} %`
          : "N/A",
        comment: ass.comment || "N/A",
        fiftyTwoWeekLow: asset.fiftyTwoWeekLow?.toFixed(2) || "N/A",
        fiftyTwoWeekHigh: asset.fiftyTwoWeekHigh?.toFixed(2) || "N/A",
        forwardPE: asset.forwardPE?.toFixed(2) || "N/A",
        trailingPE: asset.trailingPE?.toFixed(2) || "N/A",
        priceToBook: asset.priceToBook?.toFixed(2) || "N/A",
        trailingAnnualDividendYield: asset.trailingAnnualDividendYield
          ? (asset.trailingAnnualDividendYield * 100)?.toFixed(2)
          : "N/A",
        customType: ass.customType,
        key: index,
        id: ass._id,
      };
    });
  }

  return (
    <>
      <Box sx={{ p: 1 }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Watchlist
        </Typography>
        <Divider />
        {rows?.length ? <WatchlistTable rows={rows} /> : null}
      </Box>
    </>
  );
};

export default Watchlist;
