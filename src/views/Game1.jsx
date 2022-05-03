import React from 'react';
import { Board } from '../components/Board/Board';
import { GameDataProvider } from '../context/GameContext';

export const Game1 = () => {

  return (
    <GameDataProvider>
      <Board />
    </GameDataProvider>
  )
}

