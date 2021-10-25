import { Card, CardActionArea } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import ChooseBasis from "./ChooseBasis";
import { ReactComponent as Right } from "./images/RightBracket.svg";

const QuantumState = ({
  state,
  showQubit,
}: {
  state: string[];
  showQubit: (idx: number) => void;
}) => {
  const [selectedQubit, setSelectedQubit] = useState(-1);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <LeftBar />
        {state.map((value, idx) => (
          <Qubit
            key={idx}
            state={value}
            onClick={() => {
              setSelectedQubit(idx);
              setOpen(true);
            }}
          ></Qubit>
        ))}
        <Right />
      </div>

      <ChooseBasis
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        measure={(basis: number) => {
          console.log("measure", basis, selectedQubit);
          // @ts-ignore
          window.socket.emit("measureEve", selectedQubit, basis);
          showQubit(selectedQubit);
        }}
      />
    </>
  );
};

const Qubit = ({ state, onClick }: { state: string; onClick: () => void }) => {
  return (
    <QubitContainer>
      <CardActionArea
        disabled={state !== "?"}
        onClick={onClick}
        sx={{ padding: ".5rem", fontSize: "1.9rem" }}
      >
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
