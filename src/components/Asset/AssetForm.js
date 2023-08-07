import * as React from "react";
import EditAsset from "./EditAsset";
import AddAsset from "./AddAsset";
import AddTransaction from "../Transaction/AddTransaction";

const AssetForm = (props) => {
  const { selected, mode, type, handleClose } = props;

  const formToRender = (mode) => {
    switch (mode) {
      case "add":
        return <AddAsset handleClose={handleClose} type={type} />;
      case "edit":
        return <EditAsset selected={selected} handleClose={handleClose} />;
      case "transaction":
        return <AddTransaction selected={selected} handleClose={handleClose} />;
      case "emptyPortfolio":
        return <AddAsset type={mode} />;
      default:
        break;
    }
  };

  return <>{formToRender(mode)}</>;
};

export default AssetForm;
