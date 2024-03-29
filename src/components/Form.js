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
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import StockField from "./StockField";
import { createAsset } from "../actions/assetActions";
import { editPortfolioAsset } from "../actions/portfolioActions";
import { useDispatch } from "react-redux";
import Message from "./Message";
import { editWatchlistAsset } from "../actions/watchlistActions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  createTransaction,
  editTransaction,
} from "../actions/transactionActions";
import { useTheme } from "@mui/material/styles";

import InputAdornment from "@mui/material/InputAdornment";

import axios from "axios";

const Form = (props) => {
  const {
    formType,
    formContext,
    formTitle,
    fields,
    selectedItem,
    handleClose,
  } = props;
  const [message, setMessage] = React.useState({
    show: false,
    severity: "",
    message: "",
  });
  const theme = useTheme();

  console.log(formContext, formType);

  const dispatch = useDispatch();
  //Creates dynamic state object from props
  const initialState = {};
  fields.forEach((field) => {
    if (field.type !== "Asset") {
      if (field.type === "Dropdown") {
        initialState[field.name] =
          selectedItem?.[0]?.[field.name] || field.defaultSelect || "";
      } else if (formType === "Edit") {
        initialState[field.name] = selectedItem?.[0]?.[field.name] || "";
      } else if (field.type === "Date" && formType === "Add") {
        initialState[field.name] = new Date();
      } else initialState[field.name] = "";
      initialState.ticker = selectedItem?.[0]?.ticker || "";
      initialState.id = selectedItem?.[0]?.id || undefined;
      initialState.name = selectedItem?.[0]?.name || undefined;
      initialState.spentInEur = selectedItem?.[0]?.spentInEur | "";
    }
  });
  const [formValues, setFormValues] = React.useState(initialState);
  const [quote, setQuote] = React.useState({});
  const initialCurrency = selectedItem?.[0]?.currency || "";
  const [currency, setCurrency] = React.useState(initialCurrency);
  const [currencyRate, setCurrencyRate] = React.useState(undefined);

  React.useEffect(() => {
    getCurrencyRate();
  }, []);

  React.useEffect(() => {
    if (formContext === "transactions") {
      setFormValues({
        ...formValues,
        price:
          formValues.transactionAmount > 0 && formValues.transactionExpense > 0
            ? parseFloat(
                (
                  formValues.transactionExpense / formValues.transactionAmount
                ).toFixed(2)
              )
            : 0.0,
      });
    }
  }, [
    formValues.transactionAmount,
    formValues.transactionExpense,
    formContext,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let spentInEur;
    if (name === "spent") {
      spentInEur = currency === "USD" ? value * currencyRate : value;
    }
    setFormValues({ ...formValues, [name]: value, spentInEur: spentInEur });
  };

  const handleAssetChange = (asset, assetQuote) => {
    setFormValues({
      ...formValues,
      name: asset?.shortname || "",
      ticker: asset?.symbol || "",
    });
    setQuote(assetQuote || {});
    setCurrency(assetQuote?.currency || "");
  };

  const parseData = (formValues) => {
    const parsedData = {};
    for (const key in formValues) {
      if (!isNaN(formValues[key])) {
        parsedData[key] = parseFloat(formValues[key]);
      } else {
        parsedData[key] = formValues[key];
      }
    }
    return parsedData;
  };

  const getCurrencyRate = async (value) => {
    const rate = await axios.get(`/api/assets/currency/EUR=X`);
    setCurrencyRate(rate.data.price);
  };

  const dataForDividend = () => {
    const { dividend, dividendDate } = formValues;
    return {
      ...formValues,
      profit: dividend,
      date: dividendDate,
      type: "Dividend",
    };
  };

  const dataForNewTransaction = () => {
    const { type, transactionAmount, transactionExpense } = formValues;
    const { sharesAmount, spent, spentInEur } = selectedItem[0];

    //Determines whether to add or deduct
    const multiplier = type === "Buy" ? 1 : -1;
    const newAmount = (
      parseFloat(sharesAmount) +
      multiplier * parseFloat(transactionAmount)
    ).toFixed(2);

    const transactionExpenseInEur =
      currency === "USD"
        ? transactionExpense * currencyRate
        : transactionExpense;

    const newSpent = (
      parseFloat(spent) +
      multiplier * parseFloat(transactionExpense)
    ).toFixed(2);
    const newSpentInEur = (
      parseFloat(spentInEur) +
      multiplier * parseFloat(transactionExpenseInEur)
    ).toFixed(2);

    const price = (
      parseFloat(transactionExpense) / parseFloat(transactionAmount)
    ).toFixed(2);

    const transactionBody = {
      ...formValues,
      sharesAmount: newAmount,
      spent: newSpent,
      transactionExpenseInEur,
      spentInEur: newSpentInEur,
      price,
    };

    return transactionBody;
  };

  console.log("formvalues", formValues);
  console.log("selected", selectedItem);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check values and if value could be a number, parse it.
    const body = parseData(formValues);

    if (formType === "Edit" && selectedItem?.length === 1) {
      console.log("submitting edit", body);
      if (formContext === "watchlist") dispatch(editWatchlistAsset(body));
      else if (formContext === "portfolio") dispatch(editPortfolioAsset(body));
      else if (formContext === "transactions") dispatch(editTransaction(body));
    } else if (
      formType === "Add" &&
      selectedItem?.length === 1 &&
      formContext === "transactions"
    ) {
      //Need some function that creates data for this and need two dispatches..
      const transactionsBody = dataForNewTransaction();
      console.log("submitting new transaction", parseData(transactionsBody));
      debugger;
      await new Promise((resolve) =>
        resolve(dispatch(createTransaction(transactionsBody)))
      );
      await new Promise((resolve) =>
        resolve(dispatch(editPortfolioAsset(transactionsBody)))
      );
    } else if (
      formType === "Add" &&
      selectedItem?.length === 1 &&
      formContext === "dividend"
    ) {
      //dispatch addDividend here / first add dividend to transactions, then to asset, pretty much like transaction works.
      const dividendBody = dataForDividend();
      console.log("submitting dividend", dividendBody);
      await new Promise((resolve) =>
        resolve(dispatch(createTransaction(dividendBody)))
      );
      await new Promise((resolve) =>
        resolve(dispatch(editPortfolioAsset(dividendBody)))
      );
    } else if (formType === "Add") {
      console.log("submitting add", body);
      dispatch(createAsset(body, formContext));
    }
  };

  const renderField = (fields) =>
    fields.map((field) => {
      const TextFieldProps = {
        sx: { width: { lg: "100%" } },
        color: "secondary",
        variant: "outlined",
        size: "small",
        type: field.inputType === "number" ? field.inputType : undefined,
        label: field.label,
        onChange: handleInputChange,
        value: formValues[field.name],
        required: field.required,
        id: field.id,
        name: field.name,
      };
      switch (field.type) {
        case "Asset":
          return (
            <Grid
              key={field.name}
              item
              lg={field.size === "small" ? 3 : 4}
              xs={12}
            >
              {" "}
              {formType === "Edit" ? (
                <TextField
                  {...TextFieldProps}
                  inputMode="decimal"
                  min={0}
                  defaultValue={
                    selectedItem ? selectedItem[0]?.name : undefined
                  }
                />
              ) : (
                <StockField handleNewAsset={handleAssetChange} />
              )}
            </Grid>
          );
        case "Text":
          return (
            <Grid
              key={field.name}
              item
              lg={field.size === "small" ? 3 : 4}
              xs={12}
            >
              <TextField {...TextFieldProps} />
            </Grid>
          );
        case "Number":
          return (
            <Grid
              key={field.name}
              item
              lg={field.size === "small" ? 3 : 4}
              xs={12}
            >
              <TextField {...TextFieldProps} />
            </Grid>
          );
        case "TargetPrice":
          return (
            <Grid
              key={field.name}
              item
              lg={field.size === "small" ? 3 : 4}
              xs={12}
            >
              <TextField
                {...TextFieldProps}
                helperText={
                  quote.regularMarketPrice
                    ? `Current price: ${quote.regularMarketPrice}`
                    : undefined
                }
              />
            </Grid>
          );
        case "Dropdown":
          return (
            <Grid
              key={field.name}
              item
              lg={field.size === "small" ? 3 : 4}
              xs={12}
            >
              <TextField {...TextFieldProps} select>
                {field.menuItems.map((i) => {
                  return (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          );
        case "Date":
          return (
            <Grid key={field.name} item lg={2} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  color="secondary"
                  size="small"
                  label="Date of transaction"
                  value={formValues[field.name]}
                  onChange={(newValue) => {
                    setFormValues({ ...formValues, [field.name]: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  variant="outlined"
                  required
                  id="transactionDate"
                  name="transactionDate"
                ></DatePicker>
              </LocalizationProvider>
            </Grid>
          );
        case "Disabled":
          return (
            <Grid
              key={field.name}
              item
              lg={field.size === "small" ? 3 : 4}
              xs={12}
            >
              <TextField {...TextFieldProps} disabled />
            </Grid>
          );
        case "Expense":
          return (
            <Grid
              key={field.name}
              item
              lg={field.size === "small" ? 3 : 4}
              xs={12}
            >
              <TextField
                {...TextFieldProps}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{currency}</InputAdornment>
                  ),
                }}
              />
            </Grid>
          );
        default:
          return null;
      }
    });

  return (
    <Box
      sx={{
        background: theme.palette.customGradientBackground,
        p: 1,
        borderRadius: "5px",
      }}
    >
      {message.show ? (
        <Message severity={alert.severity} message={alert.message} />
      ) : null}
      <Box
        sx={{
          m: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ mr: 1 }}
          variant="h5"
          color="text.primary"
          gutterBottom
        >
          {formTitle}
        </Typography>
        {formType === "Edit" ? (
          <Chip
            sx={{ borderRadius: "4px" }}
            variant="outlined"
            label={selectedItem[0]?.name || "You need to select an asset first"}
          />
        ) : formType === "Add" && formValues.ticker ? (
          <Grid item lg={1} xs={12}>
            <Chip
              color="secondary"
              sx={{ borderRadius: "4px", width: { lg: "100%" } }}
              variant="outlined"
              label={formValues.ticker}
            />
          </Grid>
        ) : null}
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
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
          {renderField(fields)}
          <Grid item lg={2} xs={12}>
            <Button
              startIcon={formType === "Add" ? <AddIcon /> : <EditIcon />}
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
              {formType === "Add" ? "Add" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Form;
