import React, { useState } from "react";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PercentIcon from "@mui/icons-material/Percent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";

const History = (props) => {
  const theme = useTheme();
  const latestItemsByYear = Object.values(
    props.history.reduce((acc, item) => {
      if (
        !acc[item.year] ||
        new Date(item.date) > new Date(acc[item.year].date)
      ) {
        acc[item.year] = item;
      }
      return acc;
    }, {})
  );

  const sortedHistory = latestItemsByYear.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ margin: "5px" }}>
      <CardContent
        sx={{
          p: 1,
          background: open ? undefined : theme.palette.customGradientBackground,
          borderRadius: "5px",
        }}
      >
        <Typography variant="h5" color="text.primary" sx={{ display: "flex" }}>
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
      </CardContent>
      {/* <Box
        sx={{
          background: theme.palette.customGradientBackground,
          p: 1,
        }}
      > */}
      {props.history?.length && open
        ? sortedHistory.map((hist, i) => {
            return (
              <Box
                key={i}
                sx={{
                  background: theme.palette.customGradientBackground,
                  p: 2,
                  mb: "5px",
                  borderRadius: "5px",
                }}
              >
                <ListItem disablePadding>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Date"}
                    secondary={`${hist.date}`}
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
                    secondary={`${hist.worth} EUR`}
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
                    secondary={`${hist.expenses} EUR`}
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "h5" }}
                  ></ListItemText>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <MonetizationOnIcon
                      sx={
                        hist.profit > 0
                          ? { color: "secondary.main" }
                          : { color: "error.main" }
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Profit"}
                    secondary={`${hist.profit} EUR`}
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "h5" }}
                  ></ListItemText>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PercentIcon
                      sx={
                        hist.yield > 0
                          ? { color: "secondary.main" }
                          : { color: "error.main" }
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Total yield"}
                    secondary={`${hist.yield} %`}
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "h5" }}
                  ></ListItemText>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PercentIcon
                      sx={
                        hist.annualYield > 0
                          ? { color: "secondary.main" }
                          : { color: "error.main" }
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Annual yield"}
                    secondary={`${hist.annualYield} %`}
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "h5" }}
                  ></ListItemText>
                </ListItem>
              </Box>
            );
          })
        : null}
      {/* </Box> */}
    </Box>
  );
};

export default History;
