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
  const [b2, setB2] = useState("");
  const [qubit, setQubit] = useState<string[]>([]);

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

    socket.on("bobBases", (data: any) => {
      console.log(data);
      setB2(data);
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
              onClick={() => {
                socket.emit("aliceBasesReport", b);
              }}
            >
              Send Bases
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 700,
                marginLeft: "1rem",
              }}
              onClick={() => {
                var indices: number[] = [];
                for (var i = 0; i < b.length; i++) {
                  if (b[i] != b2[i]) {
                    indices.push(i);
                  }
                }
                console.log(indices);
                let new_a = "";
                for (var i = 0; i < a.length; i++) {
                  if (!indices.includes(i)) {
                    new_a += a.charAt(i);
                  }
                }
                // var i=0;
                // var tempA = "";
                // while (indices.length>0) {
                //   var index = indices.pop() || 0;
                //   if (index+1<a.length){
                //     tempA = a.slice(0,index)+a.slice(index+1);
                //   } else {
                //     tempA = a.slice(0,index);
                //   }
                // }
                // console.log(tempA);
                setA(new_a);
                let newQubits: string[] = [];
                qubit.forEach((letter, index) => {
                  if (!indices.includes(index)) {
                    newQubits.push(letter + "");
                  }
                });
                setQubit(newQubits);
              }}
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
              flexDirection: "column",
            }}
          >
            <div>a={a}</div>
            <div>b1={b}</div>
            <div>b2={b2}</div>
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
