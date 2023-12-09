import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Container,
} from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PercentIcon from "@mui/icons-material/Percent";

const DailyPortfolioPerformance = (props) => {
  const { assets, portfolio } = props;

  // const Item = styled(Chip)(({ theme }) => ({
  //   padding: theme.spacing(1),
  //   margin: theme.spacing(0.5),
  //   display: "flex",
  //   borderRadius: "5px",
  //   background: "#1d293c",
  //   justifyContent: "space-between",
  //   "& .MuiChip-label": {
  //     width: "100%",
  //     display: "flex",
  //     justifyContent: "center",
  //   },
  // }));

  const dailyChangeAmount =
    portfolio.totalWorth - portfolio.totalWorthOnPreviousClose;
  const dailyChangePercent =
    (portfolio.totalWorth - portfolio.totalWorthOnPreviousClose) /
    portfolio.totalWorthOnPreviousClose;
  return (
    <Box sx={{ margin: "5px", mt: 0 }}>
      {/* <Card> */}
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          {"Daily portfolio performance"}
        </Typography>
        <Divider />
      </CardContent>
      {/* <Box sx={{ mb: 2}}> */}
      <Grid
        container
        spacing={1}
        sx={{
          bgcolor: "#1d293c",
          borderRadius: "5px",
          margin: 0,
          mt: "5px",
          width: "100%",
        }}
      >
        <Grid item lg={6} xs={6}>
          <ListItem disablePadding>
            <ListItemIcon>
              <AccountBalanceWalletIcon
                sx={
                  dailyChangeAmount >= 0
                    ? { color: "secondary.main" }
                    : { color: "error.main" }
                }
              />
            </ListItemIcon>
            <ListItemText
              sx={{ overflow: "hidden" }}
              primary={"Value change"}
              secondary={`${dailyChangeAmount.toFixed(2)}€`}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{
                variant: "h5",
                fontWeight: 600,
              }}
            ></ListItemText>
          </ListItem>
        </Grid>

        <Grid item lg={6} xs={6}>
          <ListItem disablePadding>
            <ListItemIcon>
              <PercentIcon
                sx={
                  dailyChangePercent > 0
                    ? { color: "secondary.main" }
                    : { color: "error.main" }
                }
              />
            </ListItemIcon>
            <ListItemText
              sx={{ overflow: "hidden" }}
              primary={"Yield change"}
              secondary={`${(dailyChangePercent * 100).toFixed(2)}%`}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{
                variant: "h5",
                fontWeight: 600,
              }}
            ></ListItemText>
          </ListItem>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        color="text.primary"
        sx={{ display: "flex", justifyContent: "end", mt: 2 }}
      >
        {`Portfolio last updated:${portfolio.portfolioUpdated}`}
      </Typography>
      {/* <Divider /> */}
      {/* </Box> */}
      {/* </Card> */}
    </Box>
  );
};

export default DailyPortfolioPerformance;
