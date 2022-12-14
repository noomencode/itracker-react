import {
  PORTFOLIO_LIST_REQUEST,
  PORTFOLIO_LIST_SUCCESS,
  PORTFOLIO_LIST_FAIL,
  CALC_PORTFOLIO,
  PORTFOLIO_ASSET_EDIT_REQUEST,
  PORTFOLIO_ASSET_EDIT_SUCCESS,
  PORTFOLIO_ASSET_EDIT_FAIL,
  PORTFOLIO_DELETE_ASSETS_REQUEST,
  PORTFOLIO_DELETE_ASSETS_SUCCESS,
  PORTFOLIO_DELETE_ASSETS_FAIL,
  PORTFOLIO_ASSET_ADD_REQUEST,
  PORTFOLIO_ASSET_ADD_SUCCESS,
  PORTFOLIO_ASSET_ADD_FAIL,
} from "../constants/portfolioConstants";

export const portfolioAssetReducer = (
  state = { portfolioAssets: [] },
  action
) => {
  switch (action.type) {
    case PORTFOLIO_LIST_REQUEST:
      return { loading: true };
    case PORTFOLIO_LIST_SUCCESS:
      return { loading: false, portfolioAssets: action.payload };
    case PORTFOLIO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const portfolioAssetCUDReducer = (state = {}, action) => {
  switch (action.type) {
    case PORTFOLIO_ASSET_ADD_REQUEST:
    case PORTFOLIO_ASSET_EDIT_REQUEST:
      return { loading: true };
    case PORTFOLIO_ASSET_ADD_SUCCESS:
    case PORTFOLIO_ASSET_EDIT_SUCCESS:
      return { loading: false, assetAddPayload: action.payload };
    case PORTFOLIO_ASSET_ADD_FAIL:
    case PORTFOLIO_ASSET_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const portfolioAssetDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PORTFOLIO_DELETE_ASSETS_REQUEST:
      return { loading: true };
    case PORTFOLIO_DELETE_ASSETS_SUCCESS:
      return { loading: false, deletePayload: action.payload };
    case PORTFOLIO_DELETE_ASSETS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const portfolioPerformanceReducer = (
  state = { totalWorth: 0, totalSpent: 0 },
  action
) => {
  switch (action.type) {
    case CALC_PORTFOLIO:
      return {
        totalWorth: action.payload.totalWorth,
        totalSpent: action.payload.totalSpent,
      };
    default:
      return state;
  }
};
