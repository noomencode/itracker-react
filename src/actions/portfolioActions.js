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

export const getPortfolioAssets = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: PORTFOLIO_LIST_REQUEST });
    const { data } = await axios.get(
      // `https://weary-peplum-hare.cyclic.app/api/portfolio`,
      "/api/portfolio",
      config
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

export const addAssetToPortfolio =
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
      dispatch({ type: PORTFOLIO_ASSET_ADD_REQUEST });
      const data = await axios.put(
        "/api/portfolio/assets",
        {
          name: body.name,
          ticker: body.ticker,
          customType: body.customType,
          sharesAmount: body.sharesAmount,
          spent: body.spent,
          assets: assetId,
        },
        config
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

export const deletePortfolioAssets =
  (selected) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      data: { selected },
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      dispatch({ type: PORTFOLIO_DELETE_ASSETS_REQUEST });

      const { data } = await axios.delete("/api/portfolio/assets", config);
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

export const editPortfolioAsset = (body) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    dispatch({ type: PORTFOLIO_ASSET_EDIT_REQUEST });

    const { data } = await axios.put(
      `/api/portfolio/assets/${body.id}`,
      {
        name: body.name,
        customType: body.customType,
        sharesAmount: body.sharesAmount,
        spent: body.spent,
      },
      config
    );
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
  const portfolioLastUpdated = assets[0].asset.updatedAt;
  const date = new Date(portfolioLastUpdated);
  // Get individual date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // Create the formatted date string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  const totalWorth = assets.reduce((acc, myAsset) => {
    if (myAsset.asset.type !== "Cryptocurrency") {
      acc += myAsset.sharesAmount * myAsset.asset.price;
    }
    return acc;
  }, 0);
  const totalWorthOnPreviousClose = assets.reduce((acc, myAsset) => {
    if (myAsset.asset.type !== "Cryptocurrency") {
      let prevPrice;
      const currentDate = new Date().toISOString().slice(0, 10); // Extract YYYY-MM-DD part
      if (myAsset.asset.marketState !== "REGULAR") {
        if (myAsset.asset.regularMarketTime.slice(0, 10) < currentDate) {
          //If market is CLOSED and the last timestamp is not from today, then give regular price.
          prevPrice = myAsset.asset.price;
        } else {
          //If market is CLOSED and the last timestamp is from today, then give previous close price.
          prevPrice = myAsset.asset.regularMarketPreviousClose;
        }
      } else {
        prevPrice = myAsset.asset.regularMarketPreviousClose;
      }

      acc += myAsset.sharesAmount * prevPrice;
    }
    return acc;
  }, 0);
  const totalSpent = assets.reduce((acc, myAsset) => {
    if (myAsset.asset.type !== "Cryptocurrency") {
      acc += myAsset.spent;
    }
    return acc;
  }, 0);
  const totalWorthWithCrypto = assets.reduce((acc, myAsset) => {
    acc += myAsset.sharesAmount * myAsset.asset.price;
    return acc;
  }, 0);
  const totalSpentWithCrypto = assets.reduce((acc, myAsset) => {
    acc += myAsset.spent;
    return acc;
  }, 0);
  try {
    dispatch({
      type: CALC_PORTFOLIO,
      payload: {
        totalWorth: totalWorth,
        totalWorthOnPreviousClose: totalWorthOnPreviousClose,
        totalSpent: totalSpent,
        totalWorthWithCrypto: totalWorthWithCrypto,
        totalSpentWithCrypto: totalSpentWithCrypto,
        portfolioUpdated: formattedDate,
      },
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
