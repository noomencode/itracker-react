import * as React from "react";
import EditAsset from "./EditAsset";
import AddAsset from "./AddAsset";
import AddTransaction from "../Transaction/AddTransaction";

const AssetForm = (props) => {
  const { selected, mode, handleClose } = props;
  console.log(mode);

  const formToRender = (mode) => {
    switch (mode) {
      case "add":
        return <AddAsset handleClose={handleClose} />;
      case "edit":
        return <EditAsset selected={selected} handleClose={handleClose} />;
      case "transaction":
        return <AddTransaction selected={selected} handleClose={handleClose} />;
      default:
        break;
    }
  };

  return <>{formToRender(mode)}</>;
};

export default AssetForm;
