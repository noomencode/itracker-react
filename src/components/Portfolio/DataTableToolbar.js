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
  const initialFormState = { open: false, type: "", itemType: "" };
  const [form, setForm] = useState(initialFormState);
  const [layoutSwitch, setLayoutSwitch] = useState(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const dispatch = useDispatch();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  React.useEffect(() => {
    if (numSelected === 0) {
      setForm(form.open === false);
    }
  }, [numSelected]);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (type) => {
    setForm({ open: !form.open, type: "Add", itemType: type });
    handleMenuClose();
  };

  const handleShowForm = () => {
    // if (form.open && form.type === "Edit") {
    if (form.open) {
      setForm(initialFormState);
    } else {
      setForm({ open: true, type: "Edit" });
    }
  };

  const handleDeleteDialog = () => {
    setConfirmationDialogVisible(true);
  };

  const handleDialogClose = () => {
    if (confirmationDialogVisible) {
      setConfirmationDialogVisible(false);
    }
  };

  const handleSubmit = () => {
    setConfirmationDialogVisible(false);
    dispatch(deletePortfolioAssets(selected));
  };

  const renderForm = (form) => {
    if (form.open) {
      if (form.type === "Edit") {
        return (
          <Form
            formType="Edit"
            formContext={source}
            formTitle="Edit asset"
            selectedItem={selected}
            fields={formFields[source].edit}
            handleClose={handleShowForm}
          />
        );
      } else if (form.type === "Add" && form.itemType === "asset") {
        return (
          <Form
            formType="Add"
            formContext={source}
            formTitle={"Add asset"}
            selectedItem={selected}
            fields={formFields[source].add}
            handleClose={handleShowForm}
          />
        );
      } else if (form.type === "Add" && form.itemType === "transactions") {
        return (
          <Form
            formType="Add"
            formContext={form.itemType}
            formTitle={"Add transaction"}
            selectedItem={selected}
            fields={formFields[form.itemType].add}
            handleClose={handleShowForm}
          />
        );
      } else if (form.type === "Add" && form.itemType === "dividend") {
        return (
          <Form
            formType="Add"
            formContext={form.itemType}
            formTitle={"Add dividend"}
            selectedItem={selected}
            fields={formFields[form.itemType].add}
            handleClose={handleShowForm}
          />
        );
      }
    }
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
          {numSelected === 1 ? (
            <React.Fragment>
              <MenuItem
                value="Add new transaction"
                onClick={() => handleMenuItemClick("transactions")}
              >
                Add new transaction
              </MenuItem>
              <MenuItem
                value="Add dividend"
                onClick={() => handleMenuItemClick("dividend")}
              >
                Add dividend
              </MenuItem>
            </React.Fragment>
          ) : (
            <MenuItem
              value="Add new asset"
              onClick={() => handleMenuItemClick("asset")}
            >
              Add new asset
            </MenuItem>
          )}
        </Menu>
        {numSelected === 1 ? (
          <Tooltip title="Edit list">
            <IconButton color="secondary" onClick={() => handleShowForm()}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDeleteDialog()}>
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
      {renderForm(form)}
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
