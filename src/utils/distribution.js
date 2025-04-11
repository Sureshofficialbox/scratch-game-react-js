 // Helper for generating random numbers

import { randomInt } from "./randomUtils";

const distributeSymbols = (config) => {
  const { columns, rows, probabilities } = config;
  const board = Array.from({ length: rows }, () => Array(columns).fill(null));
  let bonusSymbol = null;

  probabilities.standardSymbols.forEach((distribution) => {
    const { symbolName, count } = distribution;

    for (let i = 0; i < count; i++) {
      let placed = false;

      while (!placed) {
        const randomRow = randomInt(0, rows - 1);
        const randomCol = randomInt(0, columns - 1);

        if (board[randomRow][randomCol] === null) {
          board[randomRow][randomCol] = symbolName;
          placed = true;
        }
      }
    }
  });

  if (probabilities.bonusSymbols) {
    bonusSymbol = probabilities.bonusSymbols.symbolName;
    const randomRow = randomInt(0, rows - 1);
    const randomCol = randomInt(0, columns - 1);
    board[randomRow][randomCol] = bonusSymbol;
  }

  return { board, bonusSymbol };
};

export default distributeSymbols;
