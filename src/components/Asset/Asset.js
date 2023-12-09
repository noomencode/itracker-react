import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PercentIcon from "@mui/icons-material/Percent";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { handleAssetDialog } from "../../actions/assetActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    //maxWidth: "500px",
    //width: "400px",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function AssetDialog({ ticker }) {
  const dispatch = useDispatch();
  const assetDialog = useSelector((state) => state.assetDialog);
  const { dialog } = assetDialog;
  const portfolioAssets = useSelector(
    (state) => state.portfolioList.portfolioAssets
  );
  const { assets } = portfolioAssets[0];
  const selectedAsset = assets.filter(function (el) {
    return el.ticker === ticker;
  });

  const {
    name,
    sharesAmount,
    spent,
    profit: realizedProfit,
  } = selectedAsset[0];
  const {
    price,
    trailingPE,
    dailyChange,
    priceToBook,
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh,
    trailingDividendYield,
    averageAnalystRating,
  } = selectedAsset[0].asset;

  const profit = (sharesAmount * price - spent).toFixed(2);
  const sharesWorth = (price * sharesAmount).toFixed(2);
  const avgPurchasePrice = (spent / sharesAmount).toFixed(2);

  const handleClose = () => {
    dispatch(handleAssetDialog(false, ticker));
  };

  const Item = (props) => {
    return (
      <ListItem disablePadding>
        {props.icon || null}
        <ListItemText
          primary={`${props.title}`}
          secondary={`${props.value}`}
          primaryTypographyProps={{ variant: "h6" }}
          secondaryTypographyProps={{ variant: "h5", color: props.color }}
        ></ListItemText>
      </ListItem>
    );
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialog.dialogOpen}
        sx={{ textAlign: "center" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{ fontWeight: 800, fontSize: "1.2em" }}
        >
          {name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Asset information
          </Typography>
          <DialogContent>
            <List>
              <Grid container spacing={1}>
                <Grid item lg={6} xs={6}>
                  <Item
                    title="Current price"
                    value={price}
                    icon={<MonetizationOnIcon sx={{ mr: 1 }} />}
                  />
                  <Item
                    title="Current profit"
                    color={profit > 0 ? "secondary.main" : "error.main"}
                    value={`${profit} EUR`}
                    icon={
                      <MonetizationOnIcon
                        sx={{
                          mr: 1,
                          color: profit > 0 ? "secondary.main" : "error.main",
                        }}
                      />
                    }
                  />
                  <Item
                    title="Shares owned"
                    value={sharesAmount}
                    icon={<AccountBalanceWalletIcon sx={{ mr: 1 }} />}
                  />
                  <Item
                    title="Total expenses"
                    icon={<MonetizationOnIcon sx={{ mr: 1 }} />}
                    value={`${spent} EUR`}
                  />
                </Grid>
                <Grid item lg={6} xs={6}>
                  <Item
                    title="Purchase price"
                    icon={<MonetizationOnIcon sx={{ mr: 1 }} />}
                    value={`${avgPurchasePrice} EUR`}
                  />
                  <Item
                    title="Daily change"
                    icon={
                      <PercentIcon
                        color={
                          dailyChange > 0 ? "secondary.main" : "error.main"
                        }
                        sx={{
                          mr: 1,
                          color:
                            dailyChange > 0 ? "secondary.main" : "error.main",
                        }}
                      />
                    }
                    color={dailyChange > 0 ? "secondary.main" : "error.main"}
                    value={`${dailyChange} %`}
                  />
                  <Item
                    title="Current value"
                    value={`${sharesWorth} EUR`}
                    icon={<AccountBalanceWalletIcon sx={{ mr: 1 }} />}
                  />
                  <Item
                    title="Realized profit"
                    value={`${realizedProfit} EUR`}
                    icon={<AccountBalanceWalletIcon sx={{ mr: 1 }} />}
                  />
                </Grid>
              </Grid>
            </List>
          </DialogContent>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Fundamentals and ratios
          </Typography>
          <DialogContent>
            <List>
              <Grid container spacing={1}>
                <Grid item lg={6} xs={6}>
                  <Item
                    title="Trailing P/E"
                    value={`${trailingPE || "N/A"}`}
                    icon={<LeaderboardIcon sx={{ mr: 1 }} />}
                  />
                  <Item
                    title="Price to Book"
                    value={`${priceToBook || "N/A"}`}
                    icon={<LeaderboardIcon sx={{ mr: 1 }} />}
                  />
                  <Item
                    title="Analyst rating"
                    value={`${averageAnalystRating || "N/A"}`}
                    icon={<LeaderboardIcon sx={{ mr: 1 }} />}
                  />
                </Grid>
                <Grid item lg={6} xs={6}>
                  <Item
                    title="52 week low"
                    value={`${fiftyTwoWeekLow || "N/A"}`}
                    icon={<LeaderboardIcon sx={{ mr: 1 }} />}
                  />
                  <Item
                    title="52 week high"
                    value={`${fiftyTwoWeekHigh || "N/A"}`}
                    icon={<LeaderboardIcon sx={{ mr: 1 }} />}
                  />
                  <Item
                    title="Dividend yield"
                    value={`${trailingDividendYield || "N/A"}`}
                    icon={<LeaderboardIcon sx={{ mr: 1 }} />}
                  />
                </Grid>
              </Grid>
            </List>
          </DialogContent>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
