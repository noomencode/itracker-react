import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography, Divider, Chip } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PercentIcon from "@mui/icons-material/Percent";

const DailyPortfolioPerformance = (props) => {
  const { assets, portfolio } = props;

  const dailyChangeAmount =
    portfolio.totalWorth - portfolio.totalWorthOnPreviousClose;
  const dailyChangePercent =
    (portfolio.totalWorth - portfolio.totalWorthOnPreviousClose) /
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
              <Chip
                variant="outlined"
                sx={{ height: "4em", width: "100%" }}
                color={dailyChangeAmount > 0 ? "secondary" : "error"}
                label={
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
                      primary={"Daily value change"}
                      secondary={`${dailyChangeAmount.toFixed(2)}€`}
                      primaryTypographyProps={{ variant: "h6" }}
                      secondaryTypographyProps={{
                        variant: "h5",
                        fontWeight: 600,
                      }}
                    ></ListItemText>
                  </ListItem>
                }
              />
            </Grid>

            <Grid item lg={6} xs={6}>
              <Chip
                variant="outlined"
                sx={{ height: "4em", width: "100%" }}
                color={dailyChangeAmount > 0 ? "secondary" : "error"}
                label={
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
                      primary={"Daily yield change"}
                      secondary={`${(dailyChangePercent * 100).toFixed(2)}%`}
                      primaryTypographyProps={{ variant: "h6" }}
                      secondaryTypographyProps={{
                        variant: "h5",
                        fontWeight: 600,
                      }}
                    ></ListItemText>
                  </ListItem>
                }
              />
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ display: "flex", justifyContent: "end", mt: 2 }}
          >
            {`Last updated:${portfolio.portfolioUpdated}`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DailyPortfolioPerformance;
