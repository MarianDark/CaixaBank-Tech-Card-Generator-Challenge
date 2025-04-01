import React from "react";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        py: 4,
        "& *:focus": { outline: "2px solid #1976D2" },
      }}
      data-testid="layout-container"
    >
      {children}
    </Container>
  );
};

export default Layout;
