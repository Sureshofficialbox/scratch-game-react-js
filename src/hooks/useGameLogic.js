import { useState } from 'react';
import distributeSymbols from '../utils/distribution';
import validateConfig from '../utils/validation';

const useGameLogic = (config) => {
  const [matrix, setMatrix] = useState([]);
  const [reward, setReward] = useState(0);
  const [bonusSymbol, setBonusSymbol] = useState(null);
  const [winningCombinations, setWinningCombinations] = useState({});

  const startGame = () => {
    // Validate configuration
    if (!validateConfig(config)) {
      alert('Invalid configuration!');
      return;
    }

    // Distribute symbols
    const { board, bonus } = distributeSymbols(config);
    setMatrix(board);
    setBonusSymbol(bonus);

    // Simulate rewards and winning combinations (replace with actual logic later)
    setWinningCombinations({ symbolA: ['WinCombo1', 'WinCombo2'] });
    const calculatedReward = Math.random() * 100; // Replace with actual reward logic
    setReward(calculatedReward);
  };

  return { matrix, reward, bonusSymbol, winningCombinations, startGame };
};

export default useGameLogic;
    