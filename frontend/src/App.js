import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alice from "./Alice";
import Eve from "./Eve";
import Bob from "./Bob";
import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { css, jsx } from "@emotion/react";

const App = () => {
  const socket = io("https://1270-128-62-34-246.ngrok.io");
  window.socket = socket;
  useEffect(() => {
    setSocketListeners();
  }, []);

  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });
  };

  const outerTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <Router>
      <ThemeProvider theme={outerTheme}>
        <Switch>
          <Route path="/alice">
            <Alice />
          </Route>
          <Route path="/bob">
            <Bob />
          </Route>
          <Route path="/eve">
            <Eve />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Typography
        variant="h3"
        color="text.primary"
        fontWeight="bold"
        sx={{
          textAlign: "center",
          paddingTop: "10rem",
          paddingBottom: "3rem",
        }}
      >
        Choose a Role
      </Typography>
      <Box sx={{ display: "flex", padding: "3rem", justifyContent: "center" }}>
        <Link to="/alice" style={{ textDecoration: "none" }}>
          <Card sx={{ maxWidth: 345, marginLeft: "1rem" }}>
            <CardActionArea>
              <span
                role="img"
                aria-label="eve"
                style={{
                  fontSize: "5rem",
                  textAlign: "center",
                  margin: "auto",
                  display: "block",
                  marginTop: "2rem",
                }}
              >
                👧
              </span>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  fontWeight="bold"
                  component="div"
                  color="text.primary"
                >
                  Alice
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The sender. Alice attempts to establish a secret key with Bob
                  by sending information through classic and quantum channels.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link to="/eve" style={{ textDecoration: "none" }}>
          <Card sx={{ maxWidth: 345, marginLeft: "1rem" }}>
            <CardActionArea>
              <span
                role="img"
                aria-label="eve"
                style={{
                  fontSize: "5rem",
                  textAlign: "center",
                  margin: "auto",
                  display: "block",
                  marginTop: "2rem",
                }}
              >
                😈
              </span>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  fontWeight="bold"
                  component="div"
                  color="text.primary"
                >
                  Eve
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The eavesdropper. Eve tries to guess the key that Alice and
                  Bob are trying to exchange by spying on the network.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link to="/bob" style={{ textDecoration: "none" }}>
          <Card sx={{ maxWidth: 345, marginLeft: "1rem" }}>
            <CardActionArea>
              <span
                role="img"
                aria-label="bob"
                style={{
                  fontSize: "5rem",
                  textAlign: "center",
                  margin: "auto",
                  display: "block",
                  marginTop: "2rem",
                }}
              >
                👦🏽
              </span>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  fontWeight="bold"
                  component="div"
                  color="text.primary"
                >
                  Bob
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The receive Bob attempts to establish a secret key with Alice
                  by sending information through classic and quantum channels.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Box>
    </Box>
  );
};

export default App;
