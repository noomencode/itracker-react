import React from "react";
import { Grid, Card, CardContent, Typography, Divider } from "@mui/material";

const WatchListCompact = (props) => {
  const { watchlistAssets } = props;

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h5" gutterBottom>
            Watchlist
          </Typography>
          <Divider />
          {watchlistAssets?.length ? (
            "list"
          ) : (
            <Typography variant="span" component="span" gutterBottom>
              No assets being watched
            </Typography>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default WatchListCompact;
