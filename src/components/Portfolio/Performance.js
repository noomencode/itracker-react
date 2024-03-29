import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PercentIcon from "@mui/icons-material/Percent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Performance = (props) => {
  // const { totalWorth, totalSpent, totalWorthWithCrypto, totalSpentWithCrypto } =
  //   props.portfolio;
  const { value, expenses, valueWithCrypto, expensesWithCrypto, dividends } =
    props.performance;
  const [showCrypto, setShowCrypto] = useState(false);
  const theme = useTheme();

  const history = props.history;
  // FIND LAST OF EVERY YEAR AND TAKE DIVIDENDS AND SUM IT ALL
  const profit = showCrypto
    ? (valueWithCrypto - expensesWithCrypto).toFixed(2)
    : (value - expenses).toFixed(2);
  const portfolioYield = showCrypto
    ? (
        ((valueWithCrypto - expensesWithCrypto) / expensesWithCrypto) *
        100
      ).toFixed(2)
    : (((value - expenses) / expenses) * 100).toFixed(2);
  // const lastHistory = history[history.length - 2];
  const currentYear = new Date().getFullYear();
  const lastYearHistory = history
    .filter((h) => h.year === currentYear - 1)
    .slice(-1)[0];
  //Annual yield calculation taken from https://taavi.golive.ee/investori-kasiraamat/kuidas-arvutada-tootlust/
  const annualYield = history?.length
    ? showCrypto
      ? (
          ((valueWithCrypto -
            (lastYearHistory.worth +
              (expensesWithCrypto - lastYearHistory.expenses))) /
            (lastYearHistory.worth +
              (expensesWithCrypto - lastYearHistory.expenses))) *
          100
        ).toFixed(2)
      : (
          ((value -
            (lastYearHistory.worth + (expenses - lastYearHistory.expenses))) /
            (lastYearHistory.worth + (expenses - lastYearHistory.expenses))) *
          100
        ).toFixed(2)
    : "N/A";

  return (
    <Box sx={{ margin: "5px" }}>
      {/* <Card sx={{ marginBottom: 1 }}> */}
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Overall portfolio performance
        </Typography>
        <Divider />
      </CardContent>
      {/* <Box sx={{ mb: 2, pl: 1, pr: 1, margin: "5px" }}> */}
      <Grid
        container
        spacing={1}
        sx={{
          background: theme.palette.customGradientBackground,
          borderRadius: "5px",
          margin: 0,
          p: 1,
          mt: "5px",
          width: "100%",
        }}
      >
        <Grid item lg={6} xs={6}>
          <ListItem disablePadding>
            <ListItemIcon>
              <AccountBalanceWalletIcon sx={{ color: "secondary.main" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Current value"}
              secondary={
                showCrypto
                  ? `${valueWithCrypto.toFixed(2)} EUR`
                  : `${value.toFixed(2)} EUR`
              }
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{ variant: "h5" }}
            ></ListItemText>
          </ListItem>
        </Grid>
        <Grid item lg={6} xs={6}>
          <ListItem disablePadding>
            <ListItemIcon>
              <MonetizationOnIcon sx={{ color: "error.main" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Expenses"}
              secondary={
                showCrypto
                  ? `${expensesWithCrypto.toFixed(2)} EUR`
                  : `${expenses.toFixed(2)} EUR`
              }
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{ variant: "h5" }}
            ></ListItemText>
          </ListItem>
        </Grid>
        <Grid item lg={6} xs={6}>
          <ListItem disablePadding>
            <ListItemIcon>
              <MonetizationOnIcon
                sx={
                  profit > 0
                    ? { color: "secondary.main" }
                    : { color: "error.main" }
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Total Profit"}
              secondary={`${profit} EUR`}
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
                  portfolioYield > 0
                    ? { color: "secondary.main" }
                    : { color: "error.main" }
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Total yield"}
              secondary={`${portfolioYield} %`}
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
                  portfolioYield > 0
                    ? { color: "secondary.main" }
                    : { color: "error.main" }
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Annual yield"}
              secondary={`${annualYield} %`}
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
                  portfolioYield > 0
                    ? { color: "secondary.main" }
                    : { color: "error.main" }
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Total dividends"}
              secondary={`${dividends} EUR`}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{ variant: "h5" }}
            ></ListItemText>
          </ListItem>
        </Grid>
        <Grid item lg={6} xs={6}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  color="secondary"
                  checked={showCrypto}
                  onChange={() => setShowCrypto(!showCrypto)}
                />
              }
              label={
                <Typography variant="h6">Include cryptocurrency</Typography>
              }
            />
          </FormGroup>
        </Grid>
      </Grid>
      {/* </Box> */}
      {/* </Card> */}
    </Box>
  );
};

export default Performance;
