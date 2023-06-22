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
import { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import Message from "../Message";
import { createTransaction } from "../../actions/transactionActions";
import { editPortfolioAsset } from "../../actions/portfolioActions";

const AddTransaction = (props) => {
  const dispatch = useDispatch();
  const { handleClose, selected } = props;
  const [alert, setAlert] = React.useState({
    show: false,
    severity: "",
    message: "",
  });

  const [date, setDate] = React.useState(new Date());
  const amount = selected?.length ? parseFloat(selected[0].sharesAmount) : 0.0;
  const [transactionAmount, setTransactionAmount] = React.useState(0.0);
  const spent = selected?.length ? parseFloat(selected[0].spent) : 0.0;
  const [transactionExpense, setTransactionExpense] = React.useState(0.0);
  const [transactionPrice, setTransactionPrice] = React.useState(0.0);
  const [type, setType] = React.useState("Buy");

  React.useEffect(() => {
    setTransactionPrice(
      parseFloat((transactionExpense / transactionAmount).toFixed(2))
    );
  }, [transactionAmount, transactionExpense]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      name: selected[0]?.name,
      ticker: selected[0]?.ticker,
      sharesAmount:
        type === "Buy"
          ? parseFloat(amount) + parseFloat(transactionAmount)
          : parseFloat(amount) - parseFloat(transactionAmount),
      transactionAmount: parseFloat(transactionAmount),
      spent:
        type === "Buy"
          ? parseFloat(spent) + parseFloat(transactionExpense)
          : parseFloat(spent) - parseFloat(transactionExpense),
      transactionExpense: parseFloat(transactionExpense),
      price: parseFloat(transactionPrice),
      type: type,
      date: date,
      id: selected[0]?.id,
    };
    if (selected.length) {
      dispatch(createTransaction(body));
      dispatch(editPortfolioAsset(body));
      //handleClose();
    } else {
      setAlert({
        show: true,
        severity: "error",
        message: "You need to have an asset selected",
      });
    }
  };

  return (
    <Card>
      {alert.show ? (
        <Message severity={alert.severity} message={alert.message} />
      ) : null}
      <Box sx={{ m: 2 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Typography
            sx={{ mr: 1 }}
            variant="h5"
            color="text.primary"
            gutterBottom
          >
            Add transaction
          </Typography>
          <Chip
            sx={{ borderRadius: "4px" }}
            variant="outlined"
            label={selected[0]?.name || "You need to select an asset first"}
          />
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        component="form"
        sx={{ m: 2 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item lg={2} xs={12}>
            <TextField
              sx={{ width: { lg: "100%" } }}
              color="secondary"
              size="small"
              type="number"
              min={0}
              label="Number of shares"
              variant="outlined"
              helperText={`Total: ${
                transactionAmount > 0
                  ? type === "Buy"
                    ? (
                        parseFloat(amount) + parseFloat(transactionAmount)
                      ).toFixed(2)
                    : (
                        parseFloat(amount) - parseFloat(transactionAmount)
                      ).toFixed(2)
                  : parseFloat(amount).toFixed(2)
              } shares`}
              onChange={(e) => {
                setTransactionAmount(e.currentTarget.value);
              }}
              required
              value={transactionAmount}
              id="sharesAmount"
              name="sharesAmount"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              sx={{ width: { lg: "100%" } }}
              color="secondary"
              type="number"
              min={0}
              size="small"
              label="Amount"
              helperText={`Total: ${
                transactionExpense > 0
                  ? type === "Buy"
                    ? (
                        parseFloat(spent) + parseFloat(transactionExpense)
                      ).toFixed(2)
                    : (
                        parseFloat(spent) - parseFloat(transactionExpense)
                      ).toFixed(2)
                  : parseFloat(spent).toFixed(2)
              } €`}
              variant="outlined"
              value={transactionExpense}
              onChange={(e) => {
                setTransactionExpense(e.currentTarget.value);
              }}
              required
              id="spent"
              name="spent"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              sx={{ width: { lg: "100%" } }}
              disabled
              value={
                transactionPrice > 0
                  ? parseFloat(transactionPrice).toFixed(2)
                  : ""
              }
              size="small"
              label="Estimated price"
              helperText={
                transactionAmount && transactionExpense
                  ? `New average: ${(
                      (parseFloat(transactionExpense) + parseFloat(spent)) /
                      (parseFloat(amount) + parseFloat(transactionAmount))
                    ).toFixed(2)}`
                  : null
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
              sx={{ width: { lg: "100%" } }}
              size="small"
              variant="outlined"
              label="Type of transaction"
              id="transaction-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default AddTransaction;
