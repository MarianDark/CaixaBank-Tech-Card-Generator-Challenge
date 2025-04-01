import React from "react";
import { Box } from "@mui/material";

const CardStripe = () => {
  return (
    <Box
      data-testid="card-back-stripe"
      sx={{
        width: "100%",
        height: 70,
        backgroundColor: "black",
        position: "absolute",
        top: 30,
        left: 0,
      }}
    />
  );
};

export default CardStripe;
