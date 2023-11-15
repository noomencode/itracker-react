import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Container,
} from "@mui/material";
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
  const { totalWorth, totalSpent, totalWorthWithCrypto, totalSpentWithCrypto } =
    props.portfolio;
  const [showCrypto, setShowCrypto] = useState(false);

  const history = props.history;
  const profit = showCrypto
    ? (totalWorthWithCrypto - totalSpentWithCrypto).toFixed(2)
    : (totalWorth - totalSpent).toFixed(2);
  const portfolioYield = showCrypto
    ? (
        ((totalWorthWithCrypto - totalSpentWithCrypto) / totalSpentWithCrypto) *
        100
      ).toFixed(2)
    : (((totalWorth - totalSpent) / totalSpent) * 100).toFixed(2);

  const annualYield = history?.length
    ? showCrypto
      ? (
          ((totalWorthWithCrypto -
            history[0].worth -
            (totalSpentWithCrypto - history[0].expenses)) /
            history[0].worth) *
          100
        ).toFixed(2)
      : (
          ((totalWorth -
            history[0].worth -
            (totalSpent - history[0].expenses)) /
            history[0].worth) *
          100
        ).toFixed(2)
    : "N/A";

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Overall portfolio performance
          </Typography>
          <Divider />
        </CardContent>
        <Container sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item lg={6} xs={6}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <AccountBalanceWalletIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Current value"}
                  secondary={
                    showCrypto
                      ? `${totalWorthWithCrypto.toFixed(2)} EUR`
                      : `${totalWorth.toFixed(2)} EUR`
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
                      ? `${totalSpentWithCrypto.toFixed(2)} EUR`
                      : `${totalSpent.toFixed(2)} EUR`
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
        </Container>
      </Card>
    </React.Fragment>
  );
};

export default Performance;
