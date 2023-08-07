import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import AssetForm from "../components/Asset/AssetForm";
import Watchlist from "../components/Watchlist/Watchlist";
import { getWatchlistAssets } from "../actions/watchlistActions";

const WatchlistScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchlistAssets());
  }, [dispatch]);

  const { watchlistAssets } = useSelector((state) => state.watchlist);
  return (
    <>
      <Typography variant="h5" color="primary" gutterBottom>
        Watchlist
      </Typography>
      <AssetForm mode="add" type="watchlist" />
      {watchlistAssets?.length ? (
        <Watchlist watchlistAssets={watchlistAssets} />
      ) : null}
    </>
  );
};

export default WatchlistScreen;
