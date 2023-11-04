import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import AssetForm from "../components/Asset/AssetForm";
import Watchlist from "../components/Watchlist/Watchlist";
import { getWatchlistAssets } from "../actions/watchlistActions";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Form from "../components/Form";
import { formFields } from "../utilities/formFields";

const WatchlistScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchlistAssets());
  }, [dispatch]);

  const { watchlistAssets } = useSelector((state) => state.watchlist);
  return (
    <Box sx={{ margin: 2 }}>
      <Grid container spacing={1}>
        <Grid item lg={12} xs={12} order={{ xs: 2, lg: 1 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Watchlist
          </Typography>
          <Form
            formTitle="Add to watchlist"
            formType="Add"
            formContext="watchlist"
            fields={formFields["watchlist"].add}
          />
          {watchlistAssets?.length ? (
            <Watchlist watchlistAssets={watchlistAssets} />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default WatchlistScreen;
