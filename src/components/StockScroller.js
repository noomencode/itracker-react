import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Marquee from "react-fast-marquee";
import AssetChip from "./Asset/AssetChip";

const StockScroller = (props) => {
  const { topAssets } = props;

  return (
    <Box sx={{ maxWidth: "100%", marginTop: 2 }}>
      <Marquee speed={75} gradient={false} style={{ overflow: "hidden" }}>
        <Stack direction="row" sx={{ justifyContent: "center" }}>
          {topAssets.map((asset, index) => {
            return (
              <AssetChip
                key={index}
                assetName={asset.name}
                dailyChange={asset.dailyChange.toFixed(2)}
                currentPrice={asset.price}
                miniChip
              />
            );
          })}
        </Stack>
      </Marquee>
    </Box>
  );
};

export default StockScroller;
