import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  createTheme,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import QuantumState from "./QuantumState";

const Bob = () => {
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

    socket.on("qubitsGenerated", (data: any) => {
      console.log("a: " + data.a);
      console.log("b: " + data.b);
      console.log("qubits: " + data.qubits);
    });

    socket.on("qubitMeasured", (data: any) => {
      console.log("eve measured: " + data);
    });

    socket.on("qubitsMeasured", (data: any) => {
      console.log("bob's bases: " + data.b2);
      console.log("bob measured: " + data.result);
    });
  };

  const bobTheme = createTheme({
    palette: {
      primary: {
        light: "#FFF3E4",
        main: "#aE9684",
        dark: "#6B4F4F",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={bobTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "#483434",
          padding: "3rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" color="primary.light" fontWeight="800">
            👦🏽 Bob
          </Typography>
          <Buttons>
            <Button
              variant="contained"
              sx={{ color: "white", textTransform: "none", fontWeight: 700 }}
            >
              Choose Bob's bases randomly
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
                marginLeft: "1rem",
              }}
            >
              Send
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
                marginLeft: "1rem",
              }}
            >
              Measure
            </Button>
          </Buttons>
        </div>

        <ChannelContainer>
          <Typography variant="h6" color="text.main" fontWeight="600">
            Classical State
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
        <ChannelContainer>
          <Typography variant="h6" color="text.main" fontWeight="600">
            Quantum State
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
const Buttons = styled("div")(({ theme }) => ({
  display: "flex",
  // marginTop: "3rem",
  // marginLeft: "3rem",
}));

export default Bob;
