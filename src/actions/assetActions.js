import {
  TOPASSET_GET_REQUEST,
  TOPASSET_GET_SUCCESS,
  TOPASSET_GET_FAIL,
  ASSET_ADD_FAIL,
  ASSET_ADD_REQUEST,
  ASSET_ADD_SUCCESS,
  ASSET_DIALOG_OPEN,
} from "../constants/assetConstants";
import axios from "axios";
import { addAssetToPortfolio } from "./portfolioActions";
import { addAssetToWatchlist } from "./watchlistActions";

export const getTopAssets = () => async (dispatch) => {
  try {
    dispatch({ type: TOPASSET_GET_REQUEST });

    const { data } = await axios.get("/api/assets/top");
    dispatch({ type: TOPASSET_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TOPASSET_GET_FAIL });
  }
};

export const createAsset = (body, source) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: ASSET_ADD_REQUEST });

    const assetData = await axios.post(
      "/api/assets",
      {
        name: body.name,
        ticker: body.ticker,
      },
      config
    );
    dispatch({ type: ASSET_ADD_SUCCESS, payload: assetData });
    source !== "watchlist"
      ? dispatch(addAssetToPortfolio(body, assetData.data._id))
      : dispatch(addAssetToWatchlist(body, assetData.data._id));
  } catch (error) {
    dispatch({ type: ASSET_ADD_FAIL });
  }
};

export const handleAssetDialog = (dialogOpen, ticker) => ({
  type: ASSET_DIALOG_OPEN,
  payload: { dialogOpen, ticker },
});
