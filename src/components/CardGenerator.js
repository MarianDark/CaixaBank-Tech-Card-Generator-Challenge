import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Typography, Box, Select, MenuItem } from "@mui/material";
import { useCards } from "../context/CardsContext";
import { generateLuhnCardNumber } from "../utils/generateLuhnCardNumber";
import { fetchCVV } from "../services/fetchCVV";
import { calculateCVV } from "../utils/calculateCVV";
import { calculateExpirationDate } from "../utils/calculateExpirationDate";
import generateCardColors from "../utils/generateCardColors";

const CardGenerator = React.memo(() => {
  const { cards, addCard } = useCards();
  const [selectedType, setSelectedType] = useState("credit");
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const cardTypes = useMemo(
    () => [
      { label: "Credit", value: "credit" },
      { label: "Debit", value: "debit" },
      { label: "Prepaid", value: "prepaid" },
    ],
    []
  );

  const handleGenerateCard = useCallback(async () => {
    if (cards.length >= 10) {
      setError("Maximum limit of 10 cards reached.");
      return;
    }

    setError("");
    setCooldown(10);

    try {
      const number = generateLuhnCardNumber();
      const expiration = calculateExpirationDate(number);
      const hexCodes = await fetchCVV().catch(() => null);
      const cvv = hexCodes ? calculateCVV(hexCodes) : "000";
      const background = generateCardColors(number);

      addCard({ number, type: selectedType, expiration, cvv, background, font: "Arial" });
    } catch (err) {
      setError("Failed to generate card. Try again.");
    }
  }, [cards, selectedType, addCard]);
  
  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Typography variant="subtitle1">Select Card Type:</Typography>
      <Select id="card-type-selector" name="cardType" value={selectedType} size="small" onChange={(e) => setSelectedType(e.target.value)} sx={{ width: 200, mb: 2 }}>
        {cardTypes.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </Select>

      <Button variant="contained" color="info" onClick={handleGenerateCard} disabled={cooldown > 0 || cards.length >= 10}>
        {cooldown > 0 ? `Wait ${cooldown}s` : "Generate Card"}
      </Button>

      {error && (
        <Typography variant="caption" sx={{ display: "block", mt: 1, color: "red" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
});

export default CardGenerator;
