import { Card, Box, TextField, Button, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { editPortfolioAsset } from "../actions/portfolioActions";
import { createAsset } from "../actions/assetActions";

const AssetForm = (props) => {
  const dispatch = useDispatch();
  const { handleClose, editMode, selected } = props;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get("name"),
      ticker: data.get("ticker"),
      sharesAmount: data.get("sharesAmount"),
      spent: data.get("spent"),
      id: editMode ? selected[0].id : undefined,
    };
    if (editMode) {
      dispatch(editPortfolioAsset(body));
    } else {
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
          Add new asset
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={2} xs={12}>
            <TextField
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
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              size="small"
              label="Ticker"
              defaultValue={
                editMode && selected?.length ? selected[0].ticker : ""
              }
              variant="outlined"
              id="ticker"
              name="ticker"
              disabled={editMode}
              required
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              size="small"
              label="Number of shares"
              variant="outlined"
              required
              defaultValue={
                editMode && selected?.length ? selected[0].sharesAmount : ""
              }
              id="sharesAmount"
              name="sharesAmount"
            ></TextField>
          </Grid>
          <Grid item lg={2} xs={12}>
            <TextField
              color="secondary"
              size="small"
              label="Amount invested"
              variant="outlined"
              required
              defaultValue={
                editMode && selected?.length ? selected[0].spent : ""
              }
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
              {editMode ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default AssetForm;
