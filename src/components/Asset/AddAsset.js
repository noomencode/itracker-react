import * as React from "react";
import {
  Card,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import Chip from "@mui/material/Chip";
import StockField from "../StockField";
import { useDispatch } from "react-redux";
import { createAsset } from "../../actions/assetActions";

const AddAsset = (props) => {
  const { handleClose, type } = props;
  const dispatch = useDispatch();
  const [spent, setSpent] = React.useState(0.0);
  const [shares, setShares] = React.useState(0.0);
  const [newAsset, setNewAsset] = React.useState(null);
  const [customType, setCustomType] = React.useState("N/A");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      name: newAsset.shortname,
      ticker: newAsset.symbol,
      spent: parseFloat(spent),
      sharesAmount: parseFloat(shares),
      customType: customType,
    };
    dispatch(createAsset(body));
    if (type !== "emptyPortfolio") {
      handleClose();
    }
  };

  const handleNewAsset = (asset) => {
    setNewAsset(asset);
  };

  return (
    <Card>
      <Box sx={{ m: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Add asset
        </Typography>
        {type !== "emptyPortfolio" ? (
          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </Box>
      <Box
        component="form"
        sx={{
          m: 2,
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item lg={4} xs={12}>
            <StockField handleNewAsset={handleNewAsset} />
          </Grid>
          {newAsset?.symbol ? (
            <Grid item lg={1} xs={12}>
              <Chip
                color="secondary"
                sx={{ borderRadius: "4px", width: { lg: "100%" } }}
                variant="outlined"
                label={newAsset?.symbol}
              />
            </Grid>
          ) : null}
          <Grid item lg={3} xs={12}>
            <TextField
              color="secondary"
              select
              sx={{ width: { lg: "100%" } }}
              size="small"
              variant="outlined"
              label="Describe asset"
              id="asset-type"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
            >
              <MenuItem value="Speculation">Speculation</MenuItem>
              <MenuItem value="Dividend">Dividend</MenuItem>
              <MenuItem value="Index">Index</MenuItem>
              <MenuItem value="Value">Value</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              size="small"
              type="number"
              min={0}
              label="Number of shares"
              variant="outlined"
              onChange={(e) => {
                setShares(e.currentTarget.value);
              }}
              required
              value={shares}
              id="sharesAmount"
              name="sharesAmount"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              type="number"
              min={0}
              size="small"
              label="Amount invested"
              variant="outlined"
              value={spent}
              onChange={(e) => {
                setSpent(e.currentTarget.value);
              }}
              required
              id="spent"
              name="spent"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <Button
              startIcon={<AddIcon />}
              sx={{
                ml: 1,
                ":hover": {
                  bgcolor: "#000000",
                  color: "secondary.main",
                },
              }}
              type="submit"
              color="inherit"
              variant="outlined"
            >
              Add asset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default AddAsset;
