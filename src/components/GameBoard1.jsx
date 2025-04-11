import React, { useState, useEffect } from "react";
import Cell from "./Cell";

const GameBoard = () => {
  const [cells, setCells] = useState(Array(9).fill(false)); // Scratch status
  const [symbols, setSymbols] = useState([]); // Hidden letters/symbols
  const [totalReward, setTotalReward] = useState(0); // Total reward
  const [outcome, setOutcome] = useState(""); // Game outcome (win/lose)

  useEffect(() => {
    // Bonus and regular symbol sets
    //const symbolSet = ["⭐", "🍀", "🎉"]; // Bonus symbols
    const symbolSet = ["10x", "5x", "+1000","+500","MISS"]; // Bonus symbols
    const regularSymbols = ["A", "B", "C", "D", "E", "F"]; // Regular symbols

    // Select one bonus symbol
    const bonusSymbol = symbolSet[Math.floor(Math.random() * symbolSet.length)];

    // Generate symbols for the game board
    const randomizedSymbols = Array(9).fill(null);

    // Choose one random index for the bonus symbol
    const bonusIndex = Math.floor(Math.random() * 9);
    randomizedSymbols[bonusIndex] = bonusSymbol;

    // Fill the remaining cells with regular symbols
    randomizedSymbols.forEach((_, index) => {
      if (randomizedSymbols[index] === null) {
        randomizedSymbols[index] = regularSymbols[Math.floor(Math.random() * regularSymbols.length)];
      }
    });

    setSymbols(randomizedSymbols);
  }, []);

  const handleScratch = (index) => {
    if (!cells[index]) {
      const newCells = [...cells];
      newCells[index] = true;
      setCells(newCells);

      // Add bonus based on the scratched symbol
      const scratchedSymbol = symbols[index];
      let bonus = 0;

      switch (scratchedSymbol) {
        case "⭐":
          bonus = 1000; // Star Bonus
          break;
        case "🍀":
          bonus = 750; // Clover Bonus
          break;
        case "🎉":
          bonus = 500; // Celebration Emoji Bonus
          break;
        case "A":
          bonus = 100;
          break;
        case "B":
          bonus = 75;
          break;
        case "C":
          bonus = 50;
          break;
        case "D":
          bonus = 25;
          break;
        case "E":
          bonus = 10;
          break;
        case "F":
          bonus = 5;
          break;
        default:
          bonus = 0;
      }

      setTotalReward((prevReward) => prevReward + bonus);

      // Check for game outcome after all cells are scratched
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
      (key) => symbolCount[key] >= 3 && !["⭐", "🍀", "🎉"].includes(key) // Exclude bonus symbols from regular check
    );

    if (winningSymbols.length > 0) {
      // If there is a winning combination, calculate rewards for both regular and bonus symbols
      let message = "You Win! Symbols with rewards: ";
      let totalWinningReward = 0;

      // Calculate reward for regular winning symbols
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

        totalWinningReward += symbolReward; // Add reward for the regular winning symbol
        message += ` "${symbol}" (${symbolCount[symbol]} times, Reward: ${symbolReward}) `;
      });

      // Include bonus symbols in reward calculation
      const bonusSymbols = ["⭐", "🍀", "🎉"];
      let bonusMessage = "";
      bonusSymbols.forEach((symbol) => {
        if (symbolCount[symbol]) {
          switch (symbol) {
            case "⭐":
              totalWinningReward += 1000;
              bonusMessage += ` "${symbol}" (Reward: 1000) `;
              break;
            case "🍀":
              totalWinningReward += 750;
              bonusMessage += ` "${symbol}" (Reward: 750) `;
              break;
            case "🎉":
              totalWinningReward += 500;
              bonusMessage += ` "${symbol}" (Reward: 500) `;
              break;
            default:
              break;
          }
        }
      });

      message += bonusMessage.trim(); // Add bonus symbols to the message
      setTotalReward(totalWinningReward); // Update total reward
      setOutcome(message.trim());
    } else {
      // If no winning combination, display losing outcome
      setTotalReward(0);
      setOutcome("You Lose! No Winning Combination available in the scratch (no symbol appeared 3 or more times).");
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

export default GameBoard1;
