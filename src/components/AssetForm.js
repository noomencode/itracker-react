import * as React from "react";
import {
  Card,
  Box,
  TextField,
  Select,
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
    editMode && selected?.length ? selected[0].sharesAmount : ""
  );
  const [transactionAmount, setTransactionAmount] = React.useState(null);

  const [spent, setSpent] = React.useState(
    editMode && selected?.length ? selected[0].spent : ""
  );

  const [transactionExpense, setTransactionExpense] = React.useState(null);
  const [price, setPrice] = React.useState(spent / amount);
  const [type, setType] = React.useState("Buy");

  React.useEffect(() => {
    setPrice(spent / amount);
  }, [amount, spent]);

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
      sharesAmount: amount,
      transactionAmount: transactionAmount,
      spent: spent,
      transactionExpense: transactionExpense,
      price: price,
      type: type,
      date: date,
      id: editMode ? selected[0].id : undefined,
    };
    if (editMode) {
      console.log(body);
      //TESTING TRANSACTION CREATION
      dispatch(createTransaction(body));
      //dispatch(editPortfolioAsset(body));
    } else {
      console.log("add", body);
      //dispatch(createAsset(body));
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
          <Grid item lg={4} xs={8}>
            {editMode ? (
              <TextField
                fullWidth={true}
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
          <Grid item lg={1} xs={3}>
            <TextField
              color="secondary"
              size="small"
              label="Ticker"
              // defaultValue={
              //   editMode && selected?.length ? selected[0].ticker : ""
              // }
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
              label="Number of shares"
              variant="outlined"
              helperText={editMode ? `Total: ${amount}` : ""}
              onChange={(e) => {
                if (editMode) {
                  setTransactionAmount(e.currentTarget.value);
                } else {
                  setAmount(e.currentTarget.value);
                }
              }}
              required
              value={editMode ? transactionAmount : amount}
              id="sharesAmount"
              name="sharesAmount"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              size="small"
              label="Amount invested"
              helperText={editMode ? `Total: ${spent}` : ""}
              variant="outlined"
              value={spent}
              onChange={(e) => setSpent(e.currentTarget.value)}
              required
              id="spent"
              name="spent"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              disabled
              value={price.toFixed(2)}
              size="small"
              label="Estimated price"
              helperText={
                editMode ? `Overall average: ${price.toFixed(2)}` : ""
              }
              variant="outlined"
              //onChange={(e) => setPrice(e.currentTarget.value.toFixed(2))}
              id="price"
              name="price"
            ></TextField>
          </Grid>
          <Grid item lg={1} xs={2}>
            <TextField
              color="secondary"
              select
              fullWidth={true}
              size="small"
              variant="outlined"
              label="Type of transaction"
              //helperText="Type of transaction"
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
