import React from "react";
import { Box, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Header = () => {
  return (
    <Box data-id="header">
      <Box display="flex" alignItems="center" justifyContent="center">
        <img src="/caixabank-tech-logo.png" alt="CaixaBank Tech logo" height="100px" />
        <ClearIcon sx={{ fontSize: 50, mx: 2 }} />
        <img src="/nuwe-logo.png" alt="NUWE logo" height="70" />
      </Box>
      <hr style={{ margin: "24px 0" }} />
      <Typography variant="h4" gutterBottom>
        Coding Challenges: Round 3
      </Typography>
    </Box>
  );
};

export default Header;
