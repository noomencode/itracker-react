import * as React from "react";
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
import { fontSize } from "@mui/system";

const Item = styled(Chip)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //   opacity: 0,
  position: "relative",
  borderRadius: 0,
  padding: theme.spacing(1),
  //textAlign: "center",
  height: "3em",
  //color: theme.palette.secondary,
  animationName: myAnimation,
  animationDuration: "3s",
  animationFillMode: "forwards",
  //animationIterationCount: "infinite",
}));

//COOL CSS TEXT ANIMATION : https://www.youtube.com/watch?v=YiSzx0Cb8_8&t=0s
const myAnimation = keyframes`
    0% { left: -30px; opacity: 0; }
    100% { left: 0; opacity: 1;  }
`;

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
    <Stack direction="row">
      <Typography variant="h6" component="p" color="text.primary">
        {`${currentprice}`}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        color={changeprice > 0 ? "secondary.main" : "error.main"}
      >
        {` ${changeprice > 0 ? "+" : ""}${changeprice}(${change})`}
      </Typography>
    </Stack>
  );
};

const StockScroller = (props) => {
  const topAssets = [
    { name: "S&P 500", price: 3670, priceChange: -100, change: "-0.36" },
    { name: "Nasdaq 100", price: 3670, priceChange: -100, change: "-0.36" },
    { name: "Treasury 5Y", price: 3670, priceChange: -100, change: "-0.36" },
    { name: "Apple", price: 3670, priceChange: -100, change: "-0.36" },
    { name: "Tesla", price: 3670, priceChange: -100, change: "-0.36" },
  ];

  return (
    <Box sx={{ maxWidth: "100%", marginTop: 2 }}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        {topAssets.map((asset) => {
          return (
            <Item
              variant="outlined"
              label={
                <ListItem sx={{ padding: 0 }}>
                  <ListItemIcon sx={{ minWidth: 0, color: "secondary.main" }}>
                    <MovingIcon />
                  </ListItemIcon>
                  <MuiListItemText
                    primary={asset.name}
                    secondary={secondary(
                      asset.price,
                      asset.priceChange,
                      asset.change
                    )}
                  />
                </ListItem>
              }
            ></Item>
          );
        })}
      </Stack>
    </Box>
  );
};

export default StockScroller;
