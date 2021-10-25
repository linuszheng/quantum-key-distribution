import React, { useState } from "react";
import {
  Box,
  Card,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import QuantumState from "./QuantumState";

const Eve = () => {
  const [state, setState] = useState([
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
  const [qubits, setQubits] = useState(state.map((letter) => "?"));
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
    setQubits(
      qubits.map((letter, index) => (idx === index ? state[idx] : letter))
    );
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
            <QuantumState state={qubits} showQubit={showQubit} />
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

export default Eve;
