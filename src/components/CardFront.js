import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ContactlessIcon from "./ContactlessIcon";
import CardChip from "./CardChip";
import { getNotch } from "../utils/getNotch";
import { calculateExpirationDate } from "../utils/calculateExpirationDate";

const formatCardNumber = (number) => (number ? number.replace(/(.{4})/g, "$1 ").trim() : "XXXX XXXX XXXX XXXX");

const CardFront = ({ number = "0000000000000000", type = "credit", font = "Arial", background = "#fff" }) => {
  const expiration = useMemo(() => calculateExpirationDate(number), [number]);
  const formattedNumber = useMemo(() => formatCardNumber(number), [number]);
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
        borderRadius: "12px",
        clipPath: getNotch(type, false),
        padding: "20px",
        fontFamily: font,
        position: "absolute",
        backfaceVisibility: "hidden",
      }}
      data-testid="card-front"
    >
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        <img src="/caixabank-tech-logo.png" alt="CaixaBank Tech logo" style={{ width: 250 }} data-testid="card-logo" />
      </Box>

      <Box sx={{ position: "absolute", top: "35%", left: 30, display: "flex", alignItems: "center" }}>
        <ContactlessIcon sx={{ fontSize: 55, marginRight: 1, width: 70, height: 70, color: "white" }} data-testid="contactless-icon" />
        <Box sx={{ width: 60, height: 50 }}>
          <CardChip sx={{ width: "100%", height: "100%" }} data-testid="card-chip" />
        </Box>
      </Box>

      <Typography sx={{ position: "absolute", fontWeight: "bold", textTransform: "uppercase", top: 30, right: 50 }} data-testid="card-type">
        {type.toUpperCase()} CARD
      </Typography>

      <Typography
        variant="h4"
        sx={{
          letterSpacing: 3,
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.9rem",
          fontFamily: font,
        }}
        data-testid="card-number"
      >
        {formattedNumber}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: "16px",
          fontWeight: "bold",
          position: "absolute",
          bottom: 40,
          left: 60,
          top: "70%",
          fontFamily: font,
        }}
        data-testid="card-expiration"
      >
        Exp: {expiration}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          letterSpacing: 2,
          fontWeight: "bold",
          position: "absolute",
          bottom: 15,
          left: 50,
          top: "80%",
          fontFamily: font,
        }}
        data-testid="card-holder"
      >
        JOHN DOE
      </Typography>
    </Box>
  );
};

export default React.memo(CardFront);
