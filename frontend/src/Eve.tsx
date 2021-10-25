import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import QuantumState from "./QuantumState";

const Eve = () => {
  // @ts-ignore
  const socket = window.socket;

  useEffect(() => {
    setSocketListeners();
  }, []);

  const [state, setState] = useState([""]);
  const [measuredIndices, setMeasuredIndices] = useState({});

  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });

    socket.on("qubitsGenerated", (data: any) => {
      console.log("received qubitsGenerated: " + data.qubits);
      setState(data.qubits);
    });

    socket.on("qubitMeasured", (data: any) => {
      console.log("qubit measured", data);
      setState((state) =>
        state.map((letter, index) =>
          index === data.index ? data.value : letter
        )
      );
    });
  };

  const eveTheme = createTheme({
    palette: {
      primary: {
        light: "#8E05C2",
        main: "#700B97",
        dark: "#3E065F",
      },
      mode: "dark",
    },
  });

  const showQubit = (idx: number) => {
    setMeasuredIndices({ ...measuredIndices, [idx]: true });
  };
  return (
    <ThemeProvider theme={eveTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "background.default",
          padding: "3rem",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h2" color="primary.light" fontWeight="800">
          😈 Eve
        </Typography>
        <ChannelContainer>
          <Typography variant="h6" color="text.main" fontWeight="600">
            Quantum Channel
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <QuantumState
              state={state.map((letter, idx) =>
                // @ts-ignore
                measuredIndices[idx] ? letter : "?"
              )}
              showQubit={showQubit}
            />
          </div>
        </ChannelContainer>
        <ChannelContainer>
          <Typography variant="h6" color="text.main" fontWeight="600">
            Classical Channel
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
              fontSize: "1.4rem",
            }}
          >
            a = 10001010101010
          </div>
        </ChannelContainer>
      </Box>
    </ThemeProvider>
  );
};

const ChannelContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  margin: "5rem 3rem",
  borderRadius: "2rem",
  padding: "2rem",
}));

export default Eve;
