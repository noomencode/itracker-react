import { Card, CardContent, Typography, Divider } from "@mui/material";
import React, { useEffect } from "react";
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
        {/* {rows?.length ? <TransactionsTable rows={rows} /> : null} */}
      </Card>
    </>
  );
};

export default Watchlist;
