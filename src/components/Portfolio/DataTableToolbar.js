import React, { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConfirmationDialog from "../ConfirmationDialog";
import AssetForm from "../Asset/AssetForm";
import Message from "../Message";
import { deletePortfolioAssets } from "../../actions/portfolioActions";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Form from "../Form";
import { formFields } from "../../utilities/formFields";

const DataTableToolbar = (props) => {
  const { numSelected, selected, handleLayout, source } = props;
  const [assetForm, setAssetForm] = useState({ open: false, mode: "" });
  const [showForm, setShowForm] = useState(false);
  const [layoutSwitch, setLayoutSwitch] = useState(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const dispatch = useDispatch();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (mode) => {
    handleAssetFormClick(mode);
    handleMenuClose();
  };

  const handleAssetFormClick = (mode) => {
    if (mode === "edit" && selected.length && selected.length < 2) {
      setError({ isError: false, message: "" });
      setAssetForm({ mode: "edit", open: !assetForm.open });
    } else if (mode === "add") {
      setError({ isError: false, message: "" });
      setAssetForm({ mode: "add", open: !assetForm.open });
    } else if (
      mode === "transaction" &&
      selected.length &&
      selected.length < 2
    ) {
      setError({ isError: false, message: "" });
      setAssetForm({ mode: "transaction", open: !assetForm.open });
    } else if (selected.length > 1) {
      setError({
        isError: true,
        message: "You can only edit one asset at once",
      });
    } else {
      setError({
        isError: true,
        message: "You need to select an asset to edit.",
      });
    }
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = (selected) => {
    if (selected.length) {
      setConfirmationDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    if (confirmationDialogVisible) {
      setConfirmationDialogVisible(false);
    }
    if (assetForm.open) {
      setAssetForm({ editMode: false, open: false });
    }
  };

  const handleSubmit = () => {
    setConfirmationDialogVisible(false);
    dispatch(deletePortfolioAssets(selected));
  };

  return (
    <Box>
      {error.isError ? (
        <Message severity="error" message={error.message} />
      ) : null}
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        <IconButton color="secondary" onClick={handleMenuOpen}>
          <AddCircleIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            value="Add new asset"
            onClick={() => handleMenuItemClick("add")}
          >
            Add new asset
          </MenuItem>
          <MenuItem
            value="Add new transaction"
            onClick={() => handleMenuItemClick("transaction")}
          >
            Add new transaction
          </MenuItem>
        </Menu>
        {numSelected === 1 ? (
          <Tooltip title="Edit list">
            <IconButton
              color="secondary"
              // onClick={() => handleAssetFormClick("edit")}
              onClick={() => handleShowForm()}
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDelete(selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton color="secondary">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
        <FormGroup sx={{ ml: 2 }}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                color="secondary"
                checked={layoutSwitch}
                onChange={() => {
                  setLayoutSwitch(!layoutSwitch);
                  handleLayout(!layoutSwitch);
                }}
              />
            }
            label={<Typography variant="h6">Small layout</Typography>}
          />
        </FormGroup>
      </Toolbar>
      {/* {assetForm.open ? (
        <AssetForm
          handleClose={handleDialogClose}
          mode={assetForm.mode}
          selected={selected}
        />
      ) : null} */}
      {showForm && numSelected === 1 ? (
        <Form
          formType="Edit"
          formContext={source}
          formTitle="Edit asset"
          selectedItem={selected}
          fields={formFields[source].edit}
          handleClose={handleShowForm}
        />
      ) : null}
      {confirmationDialogVisible ? (
        <ConfirmationDialog
          handleConfirm={handleSubmit}
          handleDialogClose={handleDialogClose}
          dialogOpen={confirmationDialogVisible}
          selectedAssets={selected}
        />
      ) : null}
    </Box>
  );
};

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default DataTableToolbar;
