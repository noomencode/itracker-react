import {
  ASSET_ADD_REQUEST,
  ASSET_ADD_FAIL,
  ASSET_ADD_SUCCESS,
  ASSET_DIALOG_OPEN,
} from "../constants/assetConstants";

export const assetReducer = (state = { assets: [] }, action) => {
  switch (action.type) {
    case ASSET_ADD_REQUEST:
      return { loading: true };
    case ASSET_ADD_SUCCESS:
      return { loading: false, data: action.payload };
    case ASSET_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const assetDialogReducer = (
  state = { dialog: { dialogOpen: false, ticker: "" } },
  action
) => {
  switch (action.type) {
    case ASSET_DIALOG_OPEN:
      return { dialog: action.payload };
    default:
      return state;
  }
};
