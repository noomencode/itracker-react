import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  assetDialogReducer,
  assetReducer,
  topAssetsReducer,
} from "./reducers/assetReducers";
import {
  portfolioAssetReducer,
  portfolioPerformanceReducer,
  portfolioAssetDeleteReducer,
  portfolioAssetCUDReducer,
} from "./reducers/portfolioReducers";
import { userLoginReducer, changePwReducer } from "./reducers/userReducers";
import { transactionReducer } from "./reducers/transactionReducers";

const reducer = combineReducers({
  assetDialog: assetDialogReducer,
  topAssets: topAssetsReducer,
  assetAdd: assetReducer,
  portfolio: portfolioPerformanceReducer,
  portfolioAssetCUD: portfolioAssetCUDReducer,
  // portfolioAssetDelete: portfolioAssetDeleteReducer,
  userLogin: userLoginReducer,
  userChangePw: changePwReducer,
  portfolioList: portfolioAssetReducer,
  transactionsList: transactionReducer,
});

const userInfoFromStorage = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : { isAuthenticated: false };

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
