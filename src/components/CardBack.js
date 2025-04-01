import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { getNotch } from "../utils/getNotch";
import CardStripe from "./CardStripe";
import CVVBox from "./CVVBox";

const CardBack = ({ cvv, type, background, font }) => {
  const notchPath = useMemo(() => getNotch(type, true), [type]);
  
  return (
    <Box
      data-testid="card-back"
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        borderRadius: "12px",
        clipPath: notchPath,
        padding: "20px",
        fontFamily: font,
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <CardStripe data-testid="magnetic-strip" />
      <Box sx={{ marginTop: "30%", display: "flex", justifyContent: "flex-end", width: "100%", paddingRight: "20px" }}>
        <CVVBox cvv={cvv} font={font} />
      </Box>
      <Box sx={{ position: "absolute", bottom: 20, left: 20 }}>
        <img data-testid="card-back-logo" src="/nuwe-logo.png" alt="NUWE logo" style={{ width: 180 }} />
      </Box>
    </Box>
  );
};

export default React.memo(CardBack);
