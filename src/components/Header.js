import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavRibbon from "./NavRibbon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../actions/userActions";

import React from "react";

const Header = () => {
  const { isAuthenticated, name } = useSelector(
    (state) => state.userLogin.userInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <Box>
        {/* <AppBar position="static"> */}
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: { xs: "left", md: "center" },
              pl: { xs: 0, md: 15 },
            }}
          >
            <AutoGraphIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: "flex",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
              //sx={{ alignContent: "center" }}
            >
              investenzo
            </Typography>
          </Box>
          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Typography variant="span" component="span" fontWeight={600}>
                {name}
              </Typography>
              <IconButton component={Link} to="/profile" color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => handleLogout()}>
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={Link} to="/login">
                <Typography component="span" sx={{ pr: 1 }}>
                  Sign in
                </Typography>
                <LoginIcon />
              </Button>
            </Box>
          )}
        </Toolbar>
        {/* </AppBar> */}
      </Box>
      <Divider />
      <NavRibbon />
    </>
  );
};

export default Header;
