import {
  PORTFOLIO_LIST_REQUEST,
  PORTFOLIO_LIST_SUCCESS,
  PORTFOLIO_LIST_FAIL,
  PORTFOLIO_ASSET_ADD_REQUEST,
  PORTFOLIO_ASSET_ADD_SUCCESS,
  PORTFOLIO_ASSET_ADD_FAIL,
  PORTFOLIO_ASSET_EDIT_REQUEST,
  PORTFOLIO_ASSET_EDIT_SUCCESS,
  PORTFOLIO_ASSET_EDIT_FAIL,
  CALC_PORTFOLIO,
  PORTFOLIO_DELETE_ASSETS_REQUEST,
  PORTFOLIO_DELETE_ASSETS_SUCCESS,
  PORTFOLIO_DELETE_ASSETS_FAIL,
} from "../constants/portfolioConstants";
import axios from "axios";

const headers = { "Content-Type": "application/json" };

export const getPortfolioAssets = () => async (dispatch) => {
  try {
    dispatch({ type: PORTFOLIO_LIST_REQUEST });
    const { data } = await axios.get(
      // `https://weary-peplum-hare.cyclic.app/api/portfolio`,
      "https://investenzo-api.onrender.com/api/portfolio"
    );
    dispatch({
      type: PORTFOLIO_LIST_SUCCESS,
      payload: data,
    });
    dispatch(calculatePortfolioPerformance(data));
  } catch (error) {
    dispatch({
      type: PORTFOLIO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addAssetToPortfolio = (body, assetId) => async (dispatch) => {
  try {
    dispatch({ type: PORTFOLIO_ASSET_ADD_REQUEST });
    const data = await axios.put(
      "https://investenzo-api.onrender.com/api/portfolio/assets",
      {
        name: body.name,
        ticker: body.ticker,
        sharesAmount: body.sharesAmount,
        spent: body.spent,
        assets: assetId,
        headers: headers,
      },
      { withCredentials: true }
    );
    dispatch({
      type: PORTFOLIO_ASSET_ADD_SUCCESS,
      payload: data,
    });
    dispatch(getPortfolioAssets());
  } catch (error) {
    dispatch({ type: PORTFOLIO_ASSET_ADD_FAIL });
  }
};

export const deletePortfolioAssets = (selected) => async (dispatch) => {
  try {
    dispatch({ type: PORTFOLIO_DELETE_ASSETS_REQUEST });

    const { data } = await axios.delete(
      "https://investenzo-api.onrender.com/api/portfolio/assets",
      {
        data: { selected },
      }
    );
    dispatch({
      type: PORTFOLIO_DELETE_ASSETS_SUCCESS,
      payload: data,
    });
    dispatch(getPortfolioAssets());
  } catch (error) {
    dispatch({
      type: PORTFOLIO_DELETE_ASSETS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editPortfolioAsset = (body) => async (dispatch) => {
  try {
    dispatch({ type: PORTFOLIO_ASSET_EDIT_REQUEST });

    const { data } = await axios.put(`/api/portfolio/assets/${body.id}`, {
      name: body.name,
      sharesAmount: body.sharesAmount,
      spent: body.spent,
    });
    dispatch({
      type: PORTFOLIO_ASSET_EDIT_SUCCESS,
      payload: data,
    });
    dispatch(getPortfolioAssets());
  } catch (error) {
    dispatch({
      type: PORTFOLIO_ASSET_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const calculatePortfolioPerformance = (data) => async (dispatch) => {
  const { assets } = data[0];
  const totalWorth = assets.reduce((acc, myAsset) => {
    acc += myAsset.sharesAmount * myAsset.asset.price;
    return acc;
  }, 0);
  const totalSpent = assets.reduce((acc, myAsset) => {
    acc += myAsset.spent;
    return acc;
  }, 0);
  try {
    dispatch({
      type: CALC_PORTFOLIO,
      payload: { totalWorth: totalWorth, totalSpent: totalSpent },
    });
  } catch (error) {
    dispatch({
      type: "PORTFOLIO_CALC_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
