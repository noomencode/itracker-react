import {
  WATCHLIST_LIST_REQUEST,
  WATCHLIST_LIST_SUCCESS,
  WATCHLIST_LIST_FAIL,
  WATCHLIST_ASSET_EDIT_REQUEST,
  WATCHLIST_ASSET_EDIT_SUCCESS,
  WATCHLIST_ASSET_EDIT_FAIL,
  WATCHLIST_DELETE_ASSETS_REQUEST,
  WATCHLIST_DELETE_ASSETS_SUCCESS,
  WATCHLIST_DELETE_ASSETS_FAIL,
  WATCHLIST_ASSET_ADD_REQUEST,
  WATCHLIST_ASSET_ADD_SUCCESS,
  WATCHLIST_ASSET_ADD_FAIL,
} from "../constants/watchlistConstants";

export const watchlistAssetReducer = (
  state = { watchlistAssets: [] },
  action
) => {
  switch (action.type) {
    case WATCHLIST_LIST_REQUEST:
      return { loading: true };
    case WATCHLIST_LIST_SUCCESS:
      return { loading: false, watchlistAssets: action.payload };
    case WATCHLIST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const watchlistAssetCUDReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_ASSET_ADD_REQUEST:
    case WATCHLIST_ASSET_EDIT_REQUEST:
    case WATCHLIST_DELETE_ASSETS_REQUEST:
      return { loading: true };
    case WATCHLIST_ASSET_ADD_SUCCESS:
      return {
        loading: false,
        type: "create",
        assetCUDPayload: action.payload,
      };
    case WATCHLIST_ASSET_EDIT_SUCCESS:
      return {
        loading: false,
        type: "update",
        assetCUDPayload: action.payload,
      };
    case WATCHLIST_DELETE_ASSETS_SUCCESS:
      return {
        loading: false,
        type: "delete",
        assetCUDPayload: action.payload,
      };
    case WATCHLIST_ASSET_ADD_FAIL:
    case WATCHLIST_ASSET_EDIT_FAIL:
    case WATCHLIST_DELETE_ASSETS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
