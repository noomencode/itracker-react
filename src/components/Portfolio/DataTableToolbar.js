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

const DataTableToolbar = (props) => {
  const { numSelected, selected } = props;
  const [assetForm, setAssetForm] = useState({ open: false, mode: "" });
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

        <Tooltip title="Edit list">
          <IconButton
            color="secondary"
            onClick={() => handleAssetFormClick("edit")}
          >
            <ModeEditIcon />
          </IconButton>
        </Tooltip>
        {/* {numSelected > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Nutrition
            </Typography>
          )} */}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              color="secondary"
              onClick={() => handleDelete(selected)}
            >
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
      </Toolbar>
      {assetForm.open ? (
        <AssetForm
          handleClose={handleDialogClose}
          mode={assetForm.mode}
          selected={selected}
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
