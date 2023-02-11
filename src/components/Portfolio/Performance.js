import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import Graphs from "../Graphs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PercentIcon from "@mui/icons-material/Percent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import History from "./History";

const Performance = (props) => {
  // const { totalWorth, totalSpent } = useSelector((state) => state.portfolio);
  // const { history } = useSelector(
  //   (state) => state.portfolioList.portfolioAssets[0]
  // );
  const { totalWorth, totalSpent } = props.portfolio;
  const history = props.history;
  const profit = (totalWorth - totalSpent).toFixed(2);
  const portfolioYield = (
    ((totalWorth - totalSpent) / totalWorth) *
    100
  ).toFixed(2);

  const annualYield = history?.length
    ? (
        ((totalWorth - history[0].worth - (totalSpent - history[0].expenses)) /
          history[0].worth) *
        100
      ).toFixed(2)
    : "N/A";

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Portfolio performance
          </Typography>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <AccountBalanceWalletIcon sx={{ color: "secondary.main" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Current worth"}
                secondary={`${totalWorth.toFixed(2)} EUR`}
                primaryTypographyProps={{ variant: "h6" }}
                secondaryTypographyProps={{ variant: "h5" }}
              ></ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <MonetizationOnIcon sx={{ color: "error.main" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Expenses"}
                secondary={`${totalSpent.toFixed(2)} EUR`}
                primaryTypographyProps={{ variant: "h6" }}
                secondaryTypographyProps={{ variant: "h5" }}
              ></ListItemText>
            </ListItem>
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
          </List>
        </CardContent>
      </Card>
      {/* <Graphs /> */}
    </React.Fragment>
  );
};

export default Performance;
