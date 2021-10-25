import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import QuantumState from "./QuantumState";

const Alice = () => {
  // @ts-ignore
  const socket = window.socket;

  useEffect(() => {
    setSocketListeners();
  }, []);

  const [qubits, setQubits] = useState([
    "0",
    "0",
    "0",
    "0",
    "0",
    "+",
    "0",
    "0",
    "0",
    "0",
    "0",
    "+",
  ]);

  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });

    socket.on("custom-server-msg", (data: any) => {
      console.log("Data received: " + data.data);
    });
  };

  const aliceTheme = createTheme({
    palette: {
      primary: {
        light: "#8E05C2",
        main: "#a58685",
        dark: "#852747",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={aliceTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "#F5C6A5",
          padding: "3rem",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h2" color="primary.light" fontWeight="800">
          👧 Alice
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
            <QuantumState state={qubits} showQubit={(idx) => {}} />
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

export default Alice;
