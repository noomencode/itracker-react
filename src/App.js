import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import "@fontsource/montserrat";
import CssBaseline from "@mui/material/CssBaseline";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import WatchlistScreen from "./screens/WatchlistScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProfileScreen from "./screens/ProfileScreen";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0A1929",
      //dark: "#fb5d89",
      500: "#455c79",
      contrastText: "#FFF",
    },
    error: { main: "#fb5d89" },
    secondary: {
      main: "#00f59f",
    },
    background: {
      default: "#0A1929",
      paper: "#111e31",
      //paper: "#001E3C",
    },
    divider: "rgba(194, 224, 255, 0.08)",
    text: {
      primary: "#fff",
      secondary: "#B2BAC2",
    },
    customGradientBackground: "linear-gradient(to bottom, #1d293c, #0A1929)",
  },
  typography: {
    fontFamily: "Montserrat",
    h6: {
      fontSize: "0.8rem",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.4rem",
    },
    h3: {
      fontSize: "1.6rem",
    },
    span: {
      fontSize: "0.9rem",
      fontWeight: "100",
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: "#009c7a",
          color: "#fff",
        },
        standardError: {
          backgroundColor: "#fb5d89",
          color: "#fff",
        },
      },
    },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     // root: {
    //     //   color: "#FFF",
    //     // },
    //   },
    // },
    MuiInputBase: {
      styleOverrides: {
        input: { background: "#0A1929" },
      },
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeScreen />
              </PrivateRoute>
            }
          />
          <Route exact path="/signup" element={<RegisterScreen />} />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <WatchlistScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <TransactionsScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
