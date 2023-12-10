import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { useTheme } from "@mui/material";

const NavRibbon = () => {
  const location = useLocation();
  const tabValues = ["/", "/transactions", "/watchlist"];
  const [value, setValue] = React.useState(location.pathname);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        // width: "20%",
        // margin: "0 auto",
        bgcolor: "primary",
        // border: "0px solid #c2e0ff14",
        boxShadow: 2,
      }}
    >
      <Tabs
        textColor="inherit"
        indicatorColor="secondary"
        value={
          tabValues.includes(location.pathname) ? location.pathname : false
        }
        onChange={handleChange}
        centered
      >
        <Tab label="Dashboard" value="/" to="/" component={Link} />
        <Tab
          label="Transactions"
          value="/transactions"
          to="/transactions"
          component={Link}
        />
        <Tab
          label="Watchlist"
          value="/watchlist"
          to="/watchlist"
          component={Link}
        />
      </Tabs>
    </Box>
  );
};

export default NavRibbon;
