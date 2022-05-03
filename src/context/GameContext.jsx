import React, { createContext } from "react";
import { useGetCards } from "../hooks/useGetCards";

export const GameContext = createContext();

export const GameDataProvider = ({ children }) => {

    const [cards, loading, error] = useGetCards();

   
    return (
        <GameContext.Provider value={{ cards, loading, error }}>
            {children}
        </GameContext.Provider>
    )
}
