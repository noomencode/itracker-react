import * as React from "react";
import {
  Card,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import StockField from "./StockField";
import { useDispatch } from "react-redux";
import { editPortfolioAsset } from "../actions/portfolioActions";
import { createTransaction } from "../actions/transactionActions";
import { createAsset } from "../actions/assetActions";
import { SettingsInputComponentOutlined } from "@mui/icons-material";

const AssetForm = (props) => {
  const dispatch = useDispatch();
  const { handleClose, editMode, selected } = props;

  const [date, setDate] = React.useState(new Date());
  const [newAsset, setNewAsset] = React.useState(null);
  const [amount, setAmount] = React.useState(
    editMode && selected?.length ? parseFloat(selected[0].sharesAmount) : 0
  );
  const [transactionAmount, setTransactionAmount] = React.useState(0);

  const [spent, setSpent] = React.useState(
    editMode && selected?.length ? parseFloat(selected[0].spent) : 0
  );

  const [transactionExpense, setTransactionExpense] = React.useState(0);
  const [price, setPrice] = React.useState(spent / amount);
  const [transactionPrice, setTransactionPrice] = React.useState(0);
  const [type, setType] = React.useState("Buy");

  React.useEffect(() => {
    setPrice(parseFloat((spent / amount).toFixed(2)));
  }, [amount, spent]);

  React.useEffect(() => {
    setTransactionPrice(
      parseFloat((transactionExpense / transactionAmount).toFixed(2))
    );
  }, [transactionAmount, transactionExpense]);

  // React.useEffect(()=>{
  //   setAmount()
  // },[transactionAmount,transactionExpense])

  const handleNewAsset = (asset) => {
    setNewAsset(asset);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      name: selected[0]?.name || newAsset.shortname,
      ticker: selected[0]?.ticker || newAsset.symbol,
      sharesAmount: editMode ? amount + transactionAmount : amount,
      transactionAmount: editMode ? transactionAmount : amount,
      spent: editMode ? spent + transactionExpense : spent,
      transactionExpense: editMode ? transactionExpense : spent,
      price: editMode ? transactionPrice : price,
      type: type,
      date: date,
      id: editMode ? selected[0].id : undefined,
    };
    if (editMode) {
      dispatch(createTransaction(body));
      dispatch(editPortfolioAsset(body));
    } else {
      dispatch(createTransaction(body));
      dispatch(createAsset(body));
    }
    handleClose();
  };

  return (
    <Card>
      <Box
        component="form"
        sx={{ m: 2 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" color="text.primary" gutterBottom>
          {editMode ? "Edit asset" : "Add new asset"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={3} xs={12}>
            {editMode ? (
              <TextField
                //fullWidth={true}
                color="secondary"
                size="small"
                variant="outlined"
                required
                defaultValue={
                  editMode && selected?.length ? selected[0].name : ""
                }
                id="name"
                label="Name"
                name="name"
              ></TextField>
            ) : (
              <StockField handleNewAsset={handleNewAsset} />
            )}
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              size="small"
              label="Ticker"
              value={
                newAsset?.symbol
                  ? newAsset.symbol
                  : editMode && selected?.length
                  ? selected[0].ticker
                  : ""
              }
              variant="outlined"
              id="ticker"
              name="ticker"
              disabled={true}
              required
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              size="small"
              type="number"
              min={0}
              label="Number of shares"
              variant="outlined"
              helperText={
                editMode
                  ? `Total: ${
                      transactionAmount > 0
                        ? (
                            parseFloat(amount) + parseFloat(transactionAmount)
                          ).toFixed(2)
                        : parseFloat(amount).toFixed(2)
                    } shares`
                  : ""
              }
              onChange={(e) => {
                if (editMode) {
                  setTransactionAmount(parseFloat(e.currentTarget.value));
                } else {
                  setAmount(parseFloat(e.currentTarget.value));
                }
              }}
              required
              value={
                editMode ? parseFloat(transactionAmount) : parseFloat(amount)
              }
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
              helperText={
                editMode
                  ? `Total: ${
                      transactionExpense > 0
                        ? (
                            parseFloat(spent) + parseFloat(transactionExpense)
                          ).toFixed(2)
                        : parseFloat(spent).toFixed(2)
                    }  €`
                  : ""
              }
              variant="outlined"
              value={
                editMode ? parseFloat(transactionExpense) : parseFloat(spent)
              }
              onChange={(e) => {
                if (editMode) {
                  setTransactionExpense(parseFloat(e.currentTarget.value));
                } else {
                  setSpent(parseFloat(e.currentTarget.value));
                }
              }}
              required
              id="spent"
              name="spent"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              fullWidth={true}
              disabled
              value={
                editMode
                  ? transactionPrice > 0
                    ? parseFloat(transactionPrice).toFixed(2)
                    : ""
                  : price > 0
                  ? parseFloat(price).toFixed(2)
                  : ""
              }
              size="small"
              label="Estimated price"
              helperText={
                editMode
                  ? `New average: ${(
                      (transactionExpense + spent) /
                      (amount + transactionAmount)
                    ).toFixed(2)}`
                  : ""
              }
              variant="outlined"
              id="price"
              name="price"
            ></TextField>
          </Grid>
          <Grid item lg={1} xs={12}>
            <TextField
              color="secondary"
              select
              fullWidth={true}
              size="small"
              variant="outlined"
              label="Type of transaction"
              id="transaction-type"
              value={type}
              onChange={(e) => setType(e.currentTarget.value)}
              disabled={!editMode}
            >
              <MenuItem value={"Buy"}>Buy</MenuItem>
              <MenuItem value={"Sell"}>Sell</MenuItem>
            </TextField>
          </Grid>

          <Grid item lg={2} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                color="secondary"
                size="small"
                label="Date of transaction"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                variant="outlined"
                required
                id="transactionDate"
                name="transactionDate"
              ></DatePicker>
            </LocalizationProvider>
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
              {editMode ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default AssetForm;
