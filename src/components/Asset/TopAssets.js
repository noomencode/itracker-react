import React from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography, Divider } from "@mui/material";
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
      <Card>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            {title}
          </Typography>
          <Divider />
        </CardContent>
        <CardContent>
          {filteredAssets.map((ass) => {
            return (
              <AssetChip
                assetName={ass.name}
                dailyChange={ass.asset.dailyChange}
                currentPrice={ass.asset.price}
              />
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TopAssets;
