import React from "react";
import Box from "@mui/material/Box";
import {
  // Card,
  CardContent,
  Typography,
  Divider,
  // Container,
} from "@mui/material";
import AssetChip from "./AssetChip";

const TopAssets = (props) => {
  const { assets, title, filter } = props;
  if (!assets[0]?.assets.length) {
    return null;
  }
  let filteredAssets;
  switch (filter) {
    case "winners":
      filteredAssets = assets[0].assets
        .filter((ass) => ass.asset.dailyChange > 0)
        .sort((a, b) => b.asset.dailyChange - a.asset.dailyChange)
        .slice(0, 5);
      break;
    case "losers":
      filteredAssets = assets[0].assets
        .filter((ass) => ass.asset.dailyChange < 0)
        .sort((a, b) => a.asset.dailyChange - b.asset.dailyChange)
        .slice(0, 5);
      break;
    case "top":
      filteredAssets = assets[0].assets
        .sort(
          (a, b) =>
            b.sharesAmount * b.asset.price - a.sharesAmount * a.asset.price
        )
        .slice(0, 5);
      break;
    default:
      filteredAssets = assets[0].assets;
  }

  return (
    <Box sx={{ mb: 1 }}>
      {/* <Card> */}
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Divider />
      </CardContent>
      <Box sx={{ mb: 2 }}>
        {filteredAssets.map((ass, index) => {
          return (
            <AssetChip
              key={index}
              assetName={ass.name}
              dailyChange={ass.asset.dailyChange.toFixed(2)}
              currentPrice={ass.asset.price}
              marketState={ass.asset.marketState}
            />
          );
        })}
      </Box>
      {/* </Card> */}
    </Box>
  );
};

export default TopAssets;
