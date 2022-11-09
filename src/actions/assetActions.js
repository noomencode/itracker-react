import {
  ASSET_ADD_FAIL,
  ASSET_ADD_REQUEST,
  ASSET_ADD_SUCCESS,
  ASSET_DIALOG_OPEN,
} from "../constants/assetConstants";
import axios from "axios";
import { addAssetToPortfolio } from "./portfolioActions";

const headers = { "Content-Type": "application/json" };

export const createAsset = (body) => async (dispatch) => {
  try {
    dispatch({ type: ASSET_ADD_REQUEST });

    const assetData = await axios.post(
      "https://investenzo-api.onrender.com/api/assets",
      {
        name: body.name,
        ticker: body.ticker,
        headers: headers,
      }
    );
    dispatch({ type: ASSET_ADD_SUCCESS, payload: assetData });
    dispatch(addAssetToPortfolio(body, assetData.data._id));
  } catch (error) {
    dispatch({ type: ASSET_ADD_FAIL });
  }
};

export const handleAssetDialog = (dialogOpen, ticker) => ({
  type: ASSET_DIALOG_OPEN,
  payload: { dialogOpen, ticker },
});
