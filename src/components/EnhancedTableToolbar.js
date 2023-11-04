import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Form from "./Form";
import Message from "./Message";
import { formFields } from "../utilities/formFields";
import ConfirmationDialog from "./ConfirmationDialog";
import { useDispatch } from "react-redux";
import { deleteWatchlistAssets } from "../actions/watchlistActions";
import { deletePortfolioAssets } from "../actions/portfolioActions";

function EnhancedTableToolbar(props) {
  const { numSelected, selected, source } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState({ isError: false, message: "" });
  const [showForm, setShowForm] = useState(false);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);

  const handleDeleteDialog = () => {
    setConfirmationDialogVisible(true);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleDialogClose = () => {
    setConfirmationDialogVisible(false);
  };

  const handleDelete = () => {
    setConfirmationDialogVisible(false);
    if (source === "watchlist") dispatch(deleteWatchlistAssets(selected));
    else if (source === "portfolio") dispatch(deletePortfolioAssets(selected));
    else if (source === "transactions") console.log("trying to delete");
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
        {numSelected === 1 ? (
          <Tooltip title="Edit list">
            <IconButton color="secondary" onClick={() => handleShowForm()}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {numSelected !== 0 ? (
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDeleteDialog()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
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
          handleConfirm={handleDelete}
          handleDialogClose={handleDialogClose}
          dialogOpen={confirmationDialogVisible}
          selectedAssets={selected}
        />
      ) : null}
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
