import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PercentIcon from "@mui/icons-material/Percent";

const DailyPortfolioPerformance = (props) => {
  const { assets, portfolio } = props;
  //   const tradeableAssets = assets[0].assets.filter(
  //     (ass) => ass.asset.tradeable === false
  //   );
  //   console.log(tradeableAssets);
  //   const dailyChangeAmount = tradeableAssets.reduce((acc, ass) => {
  //     return (
  //       acc +
  //       (ass.sharesAmount * ass.asset.price -
  //         ass.sharesAmount *
  //           (ass.asset.regularMarketOpen || ass.asset.regularMarketPreviousClose))
  //     );
  //   }, 0);
  //   const dailyChangePercent = tradeableAssets.reduce((acc, ass) => {
  //     return (
  //       acc +
  //       (ass.sharesAmount * ass.asset.price -
  //         ass.sharesAmount *
  //           (ass.asset.regularMarketOpen || ass.asset.regularMarketPreviousClose))
  //     );
  //   }, 0);
  const dailyChangeAmount =
    portfolio.totalWorth - portfolio.totalWorthOnMarketOpen;
  const dailyChangePercent =
    (portfolio.totalWorth - portfolio.totalWorthOnMarketOpen) /
    portfolio.totalWorth;
  return (
    <Box sx={{ mb: 1 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            {"Daily portfolio performance"}
          </Typography>
          <Divider />
        </CardContent>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item lg={6} xs={6}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <AccountBalanceWalletIcon
                    sx={
                      dailyChangeAmount > 0
                        ? { color: "secondary.main" }
                        : { color: "error.main" }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={"Daily value change"}
                  secondary={`${dailyChangeAmount.toFixed(2)}€`}
                  primaryTypographyProps={{ variant: "h6" }}
                  secondaryTypographyProps={{ variant: "h5" }}
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
                  primary={"Daily change %"}
                  secondary={`${(dailyChangePercent * 100).toFixed(2)}%`}
                  primaryTypographyProps={{ variant: "h6" }}
                  secondaryTypographyProps={{ variant: "h5" }}
                ></ListItemText>
              </ListItem>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DailyPortfolioPerformance;
