import React from "react";
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
              state={[
                "?",
                "?",
                "?",
                "?",
                "?",
                "+",
                "?",
                "?",
                "?",
                "?",
                "?",
                "+",
              ]}
            />
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
