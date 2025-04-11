import React, { useState, useEffect } from "react";
import Cell from "./Cell";

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(false)); // Scratch status
  const [symbols, setSymbols] = useState([]); // Hidden letters/symbols
  const [totalReward, setTotalReward] = useState(0); // Base reward before multiplier
  const [multiplier, setMultiplier] = useState(1); // Reward multiplier
  const [outcome, setOutcome] = useState(""); // Game outcome (win/lose)

  useEffect(() => {
    const symbolSet = ["10x", "5x", "+1000", "+500", "MISS"]; // Special symbols
    const regularSymbols = ["A", "B", "C", "D", "E", "F"]; // Regular symbols

    // Select one special symbol for the game board
    const specialSymbol = symbolSet[Math.floor(Math.random() * symbolSet.length)];
    const randomizedSymbols = Array(9).fill(null);

    // Place special symbol in a random cell
    const specialIndex = Math.floor(Math.random() * 9);
    randomizedSymbols[specialIndex] = specialSymbol;

    // Fill the remaining cells with regular symbols
    randomizedSymbols.forEach((_, index) => {
      if (randomizedSymbols[index] === null) {
        randomizedSymbols[index] =
          regularSymbols[Math.floor(Math.random() * regularSymbols.length)];
      }
    });

    setSymbols(randomizedSymbols);
  }, []);

  const handleScratch = (index) => {
    if (!cells[index]) {
      const newCells = [...cells];
      newCells[index] = true;
      setCells(newCells);

      // Handle special symbols and adjust rewards accordingly
      const scratchedSymbol = symbols[index];

      switch (scratchedSymbol) {
        case "10x":
          setMultiplier(10); // Apply 10x multiplier
          break;
        case "5x":
          setMultiplier(5); // Apply 5x multiplier
          break;
        case "+1000":
          setTotalReward((prevReward) => prevReward + 1000); // Add 1000 to the reward
          break;
        case "+500":
          setTotalReward((prevReward) => prevReward + 500); // Add 500 to the reward
          break;
        case "MISS":
          break; // MISS does not affect the reward
        default:
          break;
      }

      // Check if all cells are scratched
      if (newCells.every((revealed) => revealed)) {
        calculateOutcome();
      }
    }
  };

  const calculateOutcome = () => {
    // Count occurrences of each symbol
    const symbolCount = {};
    symbols.forEach((symbol) => {
      symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
    });

    // Filter regular symbols appearing 3 or more times
    const winningSymbols = Object.keys(symbolCount).filter(
      (key) =>
        symbolCount[key] >= 3 &&
        !["10x", "5x", "+1000", "+500", "MISS"].includes(key) // Exclude special symbols
    );

    if (winningSymbols.length > 0) {
      let message = "You Win! Symbols with rewards: ";
      let baseReward = 0;

      // Calculate base reward for winning symbols
      winningSymbols.forEach((symbol) => {
        let symbolReward = 0;

        switch (symbol) {
          case "A":
            symbolReward = 100 * symbolCount[symbol];
            break;
          case "B":
            symbolReward = 75 * symbolCount[symbol];
            break;
          case "C":
            symbolReward = 50 * symbolCount[symbol];
            break;
          case "D":
            symbolReward = 25 * symbolCount[symbol];
            break;
          case "E":
            symbolReward = 10 * symbolCount[symbol];
            break;
          case "F":
            symbolReward = 5 * symbolCount[symbol];
            break;
          default:
            symbolReward = 0;
        }

        baseReward += symbolReward; // Sum up base rewards
        message += ` "${symbol}" (${symbolCount[symbol]} times, Reward: ${symbolReward}) `;
      });

      // Apply multiplier to the total reward
      const finalReward = baseReward * multiplier;
      setTotalReward(finalReward); // Update total reward
      message += ` with Multiplier (${multiplier}x), Final Reward: ${finalReward}`;
      setOutcome(message.trim());
    } else {
      // If no winning combination, display losing message
      setTotalReward(0);
      setOutcome("You Lose! No Winning Combination available (no symbol appeared 3 or more times).");
    }
  };

  return (
    <div>
      <div className="game-board">
        {cells.map((revealed, index) => (
          <Cell
            key={index}
            revealed={revealed}
            symbol={symbols[index]}
            onScratch={() => handleScratch(index)}
          />
        ))}
      </div>
      {outcome && <h2>{outcome}</h2>}
      {outcome && <h2>Total Reward: {totalReward} 🎉</h2>}
    </div>
  );
};

export default GameBoard2;
