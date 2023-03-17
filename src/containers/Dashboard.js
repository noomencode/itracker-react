import AssetList from "../components/Portfolio/AssetList";
import Performance from "../components/Portfolio/Performance";
import History from "../components/Portfolio/History";
import Allocation from "../components/Portfolio/Allocation";
import Loading from "../components/Loading";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioAssets } from "../actions/portfolioActions";
import { getTopAssets } from "../actions/assetActions";
import PortfolioEmpty from "../components/Portfolio/PortfolioEmpty";
import StockScroller from "../components/StockScroller";
import WatchListCompact from "../components/WatchListCompact";
import Message from "../components/Message";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopAssets()).then(dispatch(getPortfolioAssets()));
  }, [dispatch]);

  const { portfolioAssets, loading, error } = useSelector(
    (state) => state.portfolioList
  );

  const renderMessage = (type) => {
    switch (type) {
      case "create":
        return (
          <Message severity="success" message="Asset added successfully." />
        );
      case "update":
        return (
          <Message severity="success" message="Asset updated successfully." />
        );
      case "delete":
        return (
          <Message severity="success" message="Asset deleted successfully." />
        );
      case "error":
        return (
          <Message
            severity="error"
            message="There was an error with your request"
          />
        );
      default:
        return null;
    }
  };

  const {
    loading: CUDloading,
    error: CUDerror,
    type: CUDtype,
  } = useSelector((state) => state.portfolioAssetCUD);
  const portfolio = useSelector((state) => state.portfolio);
  const { history } = portfolioAssets?.length ? portfolioAssets[0] : [];
  return (
    <>
      {!loading && portfolioAssets?.length ? (
        <>
          <StockScroller />
          <Box sx={{ margin: 2 }}>
            <Grid container spacing={1}>
              <Grid item lg={9} xs={12}>
                {CUDloading === false && !CUDerror
                  ? renderMessage(CUDtype)
                  : null}
                {CUDerror ? renderMessage("error") : null}
                {!loading && !error && portfolioAssets?.length ? (
                  <AssetList />
                ) : (
                  <PortfolioEmpty component={"AssetList"} />
                )}
              </Grid>
              <Grid item lg={3} xs={12}>
                {!loading && !error && portfolioAssets?.length ? (
                  <>
                    <Performance portfolio={portfolio} history={history} />
                    {history?.length ? <History history={history} /> : null}
                    <Allocation
                      portfolio={portfolio}
                      assets={portfolioAssets}
                    />
                    <WatchListCompact />
                    {/* <Graphs /> */}
                  </>
                ) : (
                  <PortfolioEmpty component={"Graphs"} />
                )}
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Loading open={loading} />
      )}
    </>
  );
};

export default Dashboard;
