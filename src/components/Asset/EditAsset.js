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
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { editPortfolioAsset } from "../../actions/portfolioActions";
import Message from "../Message";

const EditAsset = (props) => {
  const { selected, handleClose } = props;
  const dispatch = useDispatch();
  const [alert, setAlert] = React.useState({
    show: false,
    severity: "",
    message: "",
  });
  const [name, setName] = React.useState(selected[0]?.name);
  const [customType, setCustomType] = React.useState(
    selected[0]?.customType ? selected[0]?.customType : "N/A"
  );
  const [spent, setSpent] = React.useState(selected[0]?.spent);
  const [shares, setShares] = React.useState(selected[0]?.sharesAmount);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      name: name,
      customType: customType,
      spent: spent,
      sharesAmount: shares,
      id: selected[0]?.id,
    };
    if (selected.length) {
      dispatch(editPortfolioAsset(body));
      handleClose();
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
      <Box sx={{ m: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          Edit asset
        </Typography>
        <IconButton onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        component="form"
        sx={{ m: 1 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item lg={3} xs={12}>
            <TextField
              sx={{ width: { lg: "100%" } }}
              color="secondary"
              size="small"
              variant="outlined"
              required
              defaultValue={selected[0]?.name}
              onChange={(e) => setName(e.currentTarget.value)}
              id="name"
              label="Name"
              name="name"
            ></TextField>
          </Grid>
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
                setShares(parseFloat(e.currentTarget.value));
              }}
              required
              value={parseFloat(shares).toFixed(2)}
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
              value={parseFloat(spent).toFixed(2)}
              onChange={(e) => {
                setSpent(parseFloat(e.currentTarget.value));
              }}
              required
              id="spent"
              name="spent"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <Button
              startIcon={<EditIcon />}
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
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default EditAsset;