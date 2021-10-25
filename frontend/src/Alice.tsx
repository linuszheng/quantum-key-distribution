import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  createTheme,
  ThemeProvider,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import QuantumState from "./QuantumState";

const Alice = () => {
  // @ts-ignore
  const socket = window.socket;

  useEffect(() => {
    setSocketListeners();
  }, []);

  const [n, setN] = useState("5");

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [qubit, setQubit] = useState([]);

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
      setA(data.a);
      setB(data.b);
      setQubit(data.qubits);
    });

    socket.on("qubitMeasured", (data: any) => {
      console.log("eve measured: " + data);
    });

    socket.on("qubitsMeasured", (data: any) => {
      console.log("bob's bases: " + data.b2);
      console.log("bob measured: " + data.result);
    });
  };

  const aliceTheme = createTheme({
    palette: {
      primary: {
        light: "#A2416B",
        main: "#FF7777",
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" color="primary.light" fontWeight="800">
            👧 Alice
          </Typography>
          <Buttons>
            <Button
              variant="contained"
              sx={{ color: "white", textTransform: "none", fontWeight: 700 }}
              onClick={() => {
                socket.emit("generateAlice", Number(n));
              }}
            >
              Generate Alice's qubits
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
                marginLeft: "1rem",
              }}
              onClick={() => {}}
            >
              Send Qubits
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
                marginLeft: "1rem",
              }}
              onClick={() => {}}
            >
              Drop
            </Button>
          </Buttons>
        </div>

        <ChannelContainer>
          <Typography variant="h6" color="text.main" fontWeight="600">
            Enter n, the length of the randomly generated classical bit strings:
          </Typography>
          <TextField
            label="n"
            variant="standard"
            value={n}
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setN(event.target.value)
            }
          />
        </ChannelContainer>
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
              whiteSpace: "pre-line",
            }}
          >
            a={a}
            b={b}
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
            <QuantumState state={qubit} showQubit={(idx) => {}} />
          </div>
        </ChannelContainer>
      </Box>
    </ThemeProvider>
  );
};
const ChannelContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  margin: "3rem 2rem",
  borderRadius: "2rem",
  padding: "2rem",
}));
const Buttons = styled("div")(({ theme }) => ({
  display: "flex",
  // marginTop: "3rem",
  // marginLeft: "3rem",
}));

export default Alice;
