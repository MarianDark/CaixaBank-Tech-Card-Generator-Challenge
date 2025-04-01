import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState(() => {
    try {
      const storedCards = localStorage.getItem("cards");
      return storedCards ? JSON.parse(storedCards) : [];
    } catch (error) {
      console.error("Error loading cards from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cards", JSON.stringify(cards));
    } catch (error) {
      console.error("Error saving cards to localStorage", error);
    }
  }, [cards]);

  const addCard = useCallback((card) => {
    setCards((prevCards) => {
      if (prevCards.length < 10) {
        return [...prevCards, { ...card, id: uuidv4() }];
      }
      return prevCards;
    });
  }, []);

  const removeCard = useCallback((id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  }, []);

  const getCards = useCallback(() => {
    try {
      const storedCards = localStorage.getItem("cards");
      return storedCards ? JSON.parse(storedCards) : [];
    } catch (error) {
      console.error("Error retrieving cards from localStorage", error);
      return [];
    }
  }, []);

  return <CardsContext.Provider value={{ cards, addCard, removeCard, getCards }}>{children}</CardsContext.Provider>;
};

export const useCards = () => useContext(CardsContext);
