import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { handleAssetDialog } from "../actions/assetActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
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

  const { name, sharesAmount, spent } = selectedAsset[0];
  const {
    price,
    trailingPE,
    dailyChange,
    priceToBook,
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh,
  } = selectedAsset[0].asset;

  const profit = (sharesAmount * price - spent).toFixed(2);
  const sharesWorth = (price * sharesAmount).toFixed(2);
  const avgPurchasePrice = (spent / sharesAmount).toFixed(2);

  const handleClose = () => {
    dispatch(handleAssetDialog(false, ticker));
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialog.dialogOpen}
        sx={{ textAlign: "center" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{ fontWeight: 800, fontSize: 25 }}
        >
          {name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Asset information
          </Typography>
          <DialogContent>
            <Typography
              variant="span"
              component="h6"
              gutterBottom
            >{`Current price: ${price} EUR`}</Typography>
            <Typography
              variant="span"
              component="h6"
              gutterBottom
            >{`Average purchase price: ${avgPurchasePrice} EUR`}</Typography>
            <Typography
              variant="span"
              component="h6"
              sx={{
                color: profit > 0 ? "secondary.main" : "error.main",
              }}
              gutterBottom
            >{`Current profit: ${profit} EUR`}</Typography>
            <Typography
              variant="span"
              component="h6"
              gutterBottom
              sx={{
                color: dailyChange > 0 ? "secondary.main" : "error.main",
              }}
            >
              {`Daily change: ${dailyChange} %`}
            </Typography>
            <Typography
              variant="span"
              component="h6"
              gutterBottom
            >{`Shares owned: ${sharesAmount}`}</Typography>
            <Typography
              variant="span"
              component="h6"
              gutterBottom
            >{`Shares worth: ${sharesWorth} EUR`}</Typography>
            <Typography
              variant="span"
              component="h6"
              gutterBottom
            >{`Total cost: ${spent} EUR`}</Typography>
          </DialogContent>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Fundamentals and ratios
          </Typography>
          <DialogContent>
            <Typography variant="span" component="h6" gutterBottom>
              {`Trailing P/E: ${trailingPE}`}
            </Typography>
            <Typography variant="span" component="h6" gutterBottom>
              {`Price to Book: ${priceToBook}`}
            </Typography>
            <Typography variant="span" component="h6" gutterBottom>
              {`52 week low: ${fiftyTwoWeekLow}`}
            </Typography>
            <Typography variant="span" component="h6" gutterBottom>
              {`52 week high: ${fiftyTwoWeekHigh}`}
            </Typography>
          </DialogContent>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
