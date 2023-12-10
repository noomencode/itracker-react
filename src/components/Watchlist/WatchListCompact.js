import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Container,
} from "@mui/material";

import AssetChip from "../Asset/AssetChip";

const WatchListCompact = (props) => {
  const { watchlistAssets } = props;
  return (
    <Box sx={{ mb: 1 }}>
      {/* <Card> */}
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h5" component="h5" gutterBottom>
          Watchlist
        </Typography>
        <Divider />
      </CardContent>
      <Box sx={{ mb: 2 }}>
        {watchlistAssets?.length ? (
          watchlistAssets[0].assets.map((ass, index) => (
            <AssetChip
              key={index}
              assetName={ass.name}
              currentPrice={ass.asset.price}
              dailyChange={ass.asset.dailyChange?.toFixed(2)}
              marketState={ass.asset.marketState}
              watchlistChip
              watchlistTarget={ass.targetPrice}
            />
          ))
        ) : (
          <Typography variant="span" component="span" gutterBottom>
            No assets being watched
          </Typography>
        )}
      </Box>
      {/* </Card> */}
    </Box>
  );
};

export default WatchListCompact;
