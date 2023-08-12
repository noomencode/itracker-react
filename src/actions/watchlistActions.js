import {
  WATCHLIST_ASSET_ADD_FAIL,
  WATCHLIST_ASSET_ADD_REQUEST,
  WATCHLIST_ASSET_ADD_SUCCESS,
  WATCHLIST_LIST_FAIL,
  WATCHLIST_LIST_REQUEST,
  WATCHLIST_LIST_SUCCESS,
} from "../constants/watchlistConstants";
import axios from "axios";

export const getWatchlistAssets = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: WATCHLIST_LIST_REQUEST });
    const { data } = await axios.get("/api/watchlist", config);
    dispatch({
      type: WATCHLIST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WATCHLIST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addAssetToWatchlist =
  (body, assetId) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      // await axios.post("/api/watchlist", { body: body }, config);
      dispatch({ type: WATCHLIST_ASSET_ADD_REQUEST });
      const data = await axios.put(
        "/api/watchlist/assets",
        {
          name: body.name,
          ticker: body.ticker,
          customType: body.customType,
          assets: assetId,
          targetPrice: body.targetPrice,
          comment: body.comment,
        },
        config
      );
      dispatch({
        type: WATCHLIST_ASSET_ADD_SUCCESS,
        payload: data,
      });
      dispatch(getWatchlistAssets());
    } catch (error) {
      dispatch({ type: WATCHLIST_ASSET_ADD_FAIL });
    }
  };
