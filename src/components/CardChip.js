import React from "react";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const CardChip = () => {
  return (
    <Box
      data-testid="card-chip"
      sx={{
        width: 65,
        height: 50,
        background: "linear-gradient(135deg, #e0c285, #b08d57)",
        borderRadius: "8px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "90%",
          borderRadius: "6px",
          display: "grid",
          gridTemplateRows: "repeat(4, 1fr)",
          gap: "3px",
          padding: "3px",
          background: "linear-gradient(135deg, #c29d65, #8b6e42)",
          boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.2), inset -2px -2px 4px rgba(255,255,255,0.2)",
        }}
      >
        {[...Array(4)].map(() => (
          <Box
            key={uuidv4()}
            sx={{
              height: "4px",
              background: "linear-gradient(90deg, #a78450, #d4af37)",
              borderRadius: "2px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CardChip;
