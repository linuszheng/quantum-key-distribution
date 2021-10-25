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
    ""
  ]);

  const [bString, setBString] = useState("");
  const [b, setB] = useState("");

  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });

    socket.on("qubitsGenerated", (data: any) => {
      // create string of unknown (question mark) qubit values
      console.log("received qubitsGenerated: " + data.qubits);
      setQubits(data.qubits);
    });
    socket.on("qubitsMeasured", (data: any) => {
      // reveal qubit values
      console.log(data.result);
      // send b2 over classical channel??
      console.log(data.b2);
      setBString(data.b2);
      setQubits(data.result);
    });
    socket.on("aliceBases", (data: any) => {
      setB(data);
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
              button x
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
                marginLeft: "1rem",
              }}
              onClick={()=>socket.emit("bobBasesReport", bString)}
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
              onClick={() => socket.emit("measureBob", qubits.length)}
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
            b1={b}<br></br>
            b2={bString}
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
