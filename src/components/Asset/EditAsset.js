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

const EditAsset = (props) => {
  const { selected, handleClose } = props;
  const dispatch = useDispatch();
  const [name, setName] = React.useState(selected[0]?.name);
  const [customType, setCustomType] = React.useState("Not Applicable");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      name: name,
      customType: customType,
      id: selected[0].id,
    };
    dispatch(editPortfolioAsset(body));
    handleClose();
  };

  return (
    <Card>
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
          <Grid item lg={6} xs={12}>
            <TextField
              sx={{ width: { lg: "100%" } }}
              color="secondary"
              size="small"
              variant="outlined"
              required
              defaultValue={selected[0].name}
              onChange={(e) => setName(e.currentTarget.value)}
              id="name"
              label="Name"
              name="name"
            ></TextField>
          </Grid>
          <Grid item lg={6} xs={12}>
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
              <MenuItem value="Not Applicable">Not Applicable</MenuItem>
            </TextField>
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
