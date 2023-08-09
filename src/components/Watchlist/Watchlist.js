import { Card, CardContent, Typography, Divider } from "@mui/material";
import React, { useEffect } from "react";
import WatchlistTable from "./WatchlistTable";
import { useDispatch, useSelector } from "react-redux";
import { getWatchlistAssets } from "../../actions/watchlistActions";

const Watchlist = (props) => {
  let rows;
  const { watchlistAssets } = props;
  console.log(watchlistAssets);

  if (watchlistAssets?.length) {
    rows = watchlistAssets[0].assets.map((ass, index) => {
      const { asset } = ass;
      return {
        asset: asset.name,
        ticker: asset.ticker,
        price: asset.price,
        change: asset.dailyChange.toFixed(2),
        fiftyTwoWeekLow: asset.fiftyTwoWeekLow?.toFixed(2) || "N/A",
        fiftyTwoWeekHigh: asset.fiftyTwoWeekHigh?.toFixed(2) || "N/A",
        forwardPE: asset.forwardPE?.toFixed(2) || "N/A",
        trailingPE: asset.trailingPE?.toFixed(2) || "N/A",
        priceToBook: asset.priceToBook?.toFixed(2) || "N/A",
        trailingAnnualDividendYield:
          (asset.trailingAnnualDividendYield * 100).toFixed(2) || "N/A",
        type: ass.customType,
        key: index,
      };
    });
    console.log(rows);
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Watchlist
          </Typography>
          <Divider />
        </CardContent>
        {rows?.length ? <WatchlistTable rows={rows} /> : null}
      </Card>
    </>
  );
};

export default Watchlist;
