import * as React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MovingIcon from "@mui/icons-material/Moving";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { styled, keyframes } from "@mui/material/styles";
import Marquee from "react-fast-marquee";
import AssetChip from "./Asset/AssetChip";

const Item = styled(Chip)(({ theme }) => ({
  ...theme.typography.body2,
  position: "relative",
  padding: theme.spacing(1),
  height: "3em",
  overflow: "hidden",
  //color: theme.palette.secondary,
  // animationName: myAnimation,
  // animationDuration: "3s",
  // animationFillMode: "forwards",
  //animationIterationCount: "infinite",
}));

//COOL CSS TEXT ANIMATION : https://www.youtube.com/watch?v=YiSzx0Cb8_8&t=0s
// const myAnimation = keyframes`
//     0% { left: -30px; opacity: 0; }
//     100% { left: 0; opacity: 1;  }
// `;

const MuiListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    color: theme.palette.text.primary,
    fontSize: "1em",
  },
  "& .MuiListItemText-secondary": {
    color: false ? theme.palette.error.main : theme.palette.secondary.main,
  },
  paddingLeft: "1em",
}));

const secondary = (currentprice, changeprice, change) => {
  return (
    <>
      <Typography variant="h6" component="span" color="text.primary">
        {`${currentprice} `}
      </Typography>
      <Typography
        variant="h6"
        sx={{ pl: 0.5 }}
        component="span"
        color={changeprice > 0 ? "secondary.main" : "error.main"}
      >
        {` ${changeprice > 0 ? "+" : ""}${changeprice} (${change}%)`}
      </Typography>
    </>
  );
};

const StockScroller = (props) => {
  const { topAssets } = useSelector((state) => state.topAssets);

  return (
    <Box sx={{ maxWidth: "100%", marginTop: 2 }}>
      <Marquee speed={75} gradient={false} style={{ overflow: "hidden" }}>
        <Stack direction="row" sx={{ justifyContent: "center" }}>
          {topAssets.map((asset, index) => {
            return (
              <AssetChip
                assetName={asset.name}
                dailyChange={asset.dailyChange}
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
