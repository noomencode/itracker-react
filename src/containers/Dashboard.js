import AssetList from "../components/Portfolio/AssetList";
import Performance from "../components/Portfolio/Performance";
import History from "../components/Portfolio/History";
import Allocation from "../components/Portfolio/Allocation";
import Loading from "../components/Loading";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioAssets } from "../actions/portfolioActions";
import { getTopAssets } from "../actions/assetActions";
import PortfolioEmpty from "../components/Portfolio/PortfolioEmpty";
import StockScroller from "../components/StockScroller";
import WatchListCompact from "../components/Watchlist/WatchListCompact";
import Message from "../components/Message";
import TopAssets from "../components/Asset/TopAssets";
import DailyPortfolioPerformance from "../components/Portfolio/DailyPortfolioPerformance";
import { getWatchlistAssets } from "../actions/watchlistActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopAssets()).then(
      dispatch(getPortfolioAssets()).then(dispatch(getWatchlistAssets()))
    );
  }, [dispatch]);

  const { portfolioAssets, loading, error } = useSelector(
    (state) => state.portfolioList
  );
  const { watchlistAssets } = useSelector((state) => state.watchlist);
  const { topAssets, loading: topAssetLoading } = useSelector(
    (state) => state.topAssets
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
  const { performance } = portfolioAssets?.length ? portfolioAssets[0] : {};
  const { history } = portfolioAssets?.length ? portfolioAssets[0] : [];

  if (error && !portfolioAssets?.length) {
    return <PortfolioEmpty component={"AssetList"} />;
  } else if (
    loading ||
    topAssetLoading ||
    !portfolioAssets?.length ||
    !topAssets?.length
  ) {
    return <Loading open={loading} />;
  } else {
    return (
      <>
        {topAssets.length ? <StockScroller topAssets={topAssets} /> : null}
        <Box sx={{ margin: 2 }}>
          <Grid container spacing={1}>
            <Grid item lg={9} xs={12} order={{ xs: 2, lg: 1 }}>
              {CUDloading === false && !CUDerror
                ? renderMessage(CUDtype)
                : null}
              {CUDerror ? renderMessage("error") : null}

              <Grid container spacing={1}>
                <Grid item lg={4} xs={12}>
                  <TopAssets
                    assets={portfolioAssets}
                    title="Top winners"
                    filter="winners"
                  />
                </Grid>
                <Grid item lg={4} xs={12}>
                  <TopAssets
                    assets={portfolioAssets}
                    title="Top losers"
                    filter="losers"
                  />
                </Grid>
                <Grid item lg={4} xs={12}>
                  <TopAssets
                    assets={portfolioAssets}
                    title="Portfolio top"
                    filter="top"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3} xs={12} order={{ xs: 1, lg: 2 }}>
              <DailyPortfolioPerformance
                assets={portfolioAssets}
                performance={performance}
              />
              <Performance performance={performance} history={history} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={9} xs={12}>
              <AssetList assets={portfolioAssets} />
            </Grid>
            <Grid item lg={3} xs={12}>
              <WatchListCompact watchlistAssets={watchlistAssets} />

              {history?.length ? <History history={history} /> : null}
              <Allocation performance={performance} assets={portfolioAssets} />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
};

export default Dashboard;
