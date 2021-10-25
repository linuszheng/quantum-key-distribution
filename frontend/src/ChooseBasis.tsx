import { Dialog, Typography, Card, Button } from "@mui/material";
import React from "react";
import { ReactComponent as Basis1 } from "./images/01basis.svg";
import { ReactComponent as Basis2 } from "./images/+-basis.svg";

const ChooseBasis = ({
  open,
  onClose,
  measure,
}: {
  open: boolean;
  onClose: () => void;
  measure: (basis: number) => any;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Card sx={{ backgroundColor: "primary.dark", padding: "2rem" }}>
        <Typography variant="h5" fontWeight="700" marginBottom="1rem">
          Choose your basis:
        </Typography>
        <Button
          onClick={() => {
            measure(0);
            onClose();
          }}
        >
          <Basis1 />
        </Button>
        <Button
          onClick={() => {
            measure(1);
            onClose();
          }}
        >
          <Basis2 />
        </Button>
      </Card>
    </Dialog>
  );
};

export default ChooseBasis;
