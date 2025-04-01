import React, { useState, useMemo, useCallback } from "react";
import { useCards } from "../context/CardsContext";
import { Box, Card as MuiCard } from "@mui/material";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import CardEditControls from "./CardEditControls";
import generateCardColors from "../utils/generateCardColors";

const CustomCard = React.memo(({ card }) => {
  const { removeCard } = useCards();
  const [flipped, setFlipped] = useState(false);
  const { gradient, solidColor } = useMemo(() => generateCardColors(card.number), [card.number]);
  const [background, setBackground] = useState(gradient);
  const [font, setFont] = useState(card.font || "Arial", "Courier New", "Georgia");
  const handleFlip = useCallback(() => setFlipped((prev) => !prev), []);
  const handleRemove = useCallback(() => removeCard(card.id), [removeCard, card.id]);

  return (
    <Box sx={{ position: "relative", width: "100%", textAlign: "center", mb: 3 }}>
      <MuiCard
        sx={{
          width: "100%",
          height: 400,
          borderRadius: "12px",
          perspective: "1000px",
          cursor: "pointer",
          boxShadow: "none",
          background,
          fontFamily: font,
        }}
        onClick={handleFlip}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s ease-in-out",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {!flipped ? (
            <CardFront number={card.number} type={card.type} expiration={card.expiration} font={font} background={background} />
          ) : (
            <CardBack cvv={card.cvv} type={card.type} background={background} font={font} />
          )}
        </Box>
      </MuiCard>
    
      <CardEditControls background={solidColor} setBackground={setBackground} font={font} setFont={setFont} removeCard={handleRemove} id={card.id} />
    </Box>
  );
});

export default CustomCard;
