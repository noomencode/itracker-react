import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const WatchListCompact = (props) => {
  const { watchlistAssets } = props;

  return (
    <Box sx={{ mb: 1 }}>
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
    </Box>
  );
};

export default WatchListCompact;
