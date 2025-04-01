import React from "react";
import { Box, Typography } from "@mui/material";

const CVVBox = ({ cvv, font }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        right: 70,
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center",
        fontFamily: font,
      }}
    >
      <Box
        data-testid="card-back-cvv-box"
        sx={{
          width: "80px",
          height: "40px",
          backgroundColor: "white",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          fontWeight: "bold",
          fontFamily: font,
        }}
      >
        <Typography data-testid="card-back-cvv" variant="h6" sx={{ fontFamily: font }}>
          {cvv}
        </Typography>
      </Box>

      <Typography
        data-testid="card-back-cvv-label"
        variant="caption"
        sx={{
          marginTop: 1,
          fontSize: "15px",
          color: "white",
          fontWeight: "bold",
          fontFamily: font,
        }}
      >
        CVV
      </Typography>
    </Box>
  );
};

export default CVVBox;
