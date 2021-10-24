import { Card, CardActionArea } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { ReactComponent as Right } from "./images/RightBracket.svg";

const QuantumState = ({ state }: { state: string[] }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <LeftBar />
      {state.map((value, idx) => (
        <Qubit key={idx} state={value} index={idx}></Qubit>
      ))}
      <Right />
    </div>
  );
};

const Qubit = ({ state, index }: { state: string; index: number }) => {
  return (
    <QubitContainer>
      <CardActionArea sx={{ padding: ".5rem", fontSize: "1.9rem" }}>
        {state}
      </CardActionArea>
    </QubitContainer>
  );
};

const QubitContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  margin: ".5rem",
}));

const LeftBar = styled("div")(({ theme: { palette } }) => ({
  width: ".5rem",
  height: "5rem",
  backgroundColor: palette.primary.main,
  marginRight: "1rem",
}));

// const RightBracket =

export default QuantumState;
