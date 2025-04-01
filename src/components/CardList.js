import React, { useMemo, useCallback } from "react";
import { useCards } from "../context/CardsContext";
import CustomCard from "./CustomCard";
import { Typography, Box, Button } from "@mui/material";

const CardList = React.memo(() => {
  const { cards, getCards } = useCards();

  const renderedCards = useMemo(() => {
    return cards.length > 0 ? (
      cards.map((card) => (
        <Box my={4} key={card.id}>
          <CustomCard card={card} />
        </Box>
      ))
    ) : (
      <Typography variant="body2" color="gray">
        No cards available
      </Typography>
    );
  }, [cards]);

  const handleShowCards = useCallback(() => {
    console.log(getCards());
  }, [getCards]);
  
  return (
    <Box sx={{ mt: 3, textAlign: "center" }}>
      <Typography variant="h5">Stored Cards</Typography>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleShowCards}>
        Show Stored Cards in Console
      </Button>

      {renderedCards}
    </Box>
  );
});

export default CardList;
