import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login, logOut } from "../actions/userActions";
import Loading from "../components/Loading";

export default function SignIn() {
  const { userInfo, loading } = useSelector((state) => state.userLogin);
  const { isAuthenticated } = userInfo;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      dispatch(logOut());
      navigate("/login");
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (email && password) {
      dispatch(login(email, password));
    } else {
      console.log("invalid login input");
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <Card sx={{ p: 2, mt: 2 }}>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  ":hover": {
                    bgcolor: "secondary.main", // theme.palette.primary.main
                    color: "primary.main",
                  },
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item sm>
                  <Link
                    component={RouterLink}
                    color="text.secondary"
                    to="/forgot-login"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item sm>
                  <Link
                    color="text.secondary"
                    component={RouterLink}
                    to="/signup"
                    variant="body2"
                  >
                    {"Don't have an account? Sign up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    );
  }
}
