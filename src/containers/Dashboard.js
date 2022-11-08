import AssetList from "../components/AssetList";
import PortfolioPerformance from "../components/PortfolioPerformance";
import Loading from "../components/Loading";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioAssets } from "../actions/portfolioActions";
import PortfolioEmpty from "../components/PortfolioEmpty";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { portfolioAssets, loading, error } = useSelector(
    (state) => state.portfolioList
  );
  useEffect(() => {
    dispatch(getPortfolioAssets());
  }, [dispatch]);

  return (
    <>
      {!loading ? (
        <Box sx={{ margin: 2 }}>
          <Grid container spacing={1}>
            <Grid item lg={9} xs={12}>
              {!loading && !error && portfolioAssets.length ? (
                <AssetList />
              ) : (
                <PortfolioEmpty component={"AssetList"} />
              )}
            </Grid>
            <Grid item lg={3} xs={12}>
              {!error && portfolioAssets.length ? (
                <PortfolioPerformance />
              ) : (
                <PortfolioEmpty component={"Graphs"} />
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Loading open={loading} />
      )}
    </>
  );
};

export default Dashboard;
