import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Alice from "./Alice";
import Eve from "./Eve";
import Bob from "./Bob";
import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const App = () => {
  const socket = io("http://localhost:5000");
  window.socket = socket;
  useEffect(() => {
    setSocketListeners();
  }, []);

  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });

    socket.on("custom-server-msg", (data) => {
      console.log("Data received: " + data.data);
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
        {/* <Background></Background> */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h3"
            color="text.primary"
            fontWeight="bold"
            sx={{ textAlign: "center", margin: "auto" }}
          >
            Choose a Role
          </Typography>
        </Box>

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
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

const Background = styled.div`
  background-color: black;
`;

export default App;
