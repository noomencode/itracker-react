import * as React from "react";
import {
  Card,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import EditAsset from "./EditAsset";
import AddAsset from "./AddAsset";

const AssetForm = (props) => {
  const { selected, editMode, handleClose } = props;

  return (
    <>
      {editMode && selected.length ? (
        <EditAsset selected={selected} handleClose={handleClose} />
      ) : (
        <AddAsset handleClose={handleClose} />
      )}
    </>
  );
};

export default AssetForm;
