import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PercentIcon from "@mui/icons-material/Percent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const History = (props) => {
  const { date, worth, expenses } = props.history[0];
  const profit = (worth - expenses).toFixed(2);
  const portfolioYield = (((worth - expenses) / worth) * 100).toFixed(2);

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ display: "flex" }}
          >
            Portfolio history
            {open ? (
              <KeyboardDoubleArrowUpIcon
                sx={{ display: "flex", cursor: "pointer" }}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            ) : (
              <KeyboardDoubleArrowDownIcon
                sx={{ display: "flex", cursor: "pointer" }}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            )}
          </Typography>
          {open ? (
            <>
              <Divider sx={{ mb: 1 }} />
              <ListItem disablePadding>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Date"}
                  secondary={`${date}`}
                  primaryTypographyProps={{ variant: "h6" }}
                  secondaryTypographyProps={{ variant: "h5" }}
                ></ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Value"}
                  secondary={`${worth.toFixed(2)} EUR`}
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
                  secondary={`${expenses.toFixed(2)} EUR`}
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
                  primary={"Profit"}
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
            </>
          ) : null}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default History;
