import React, { useState, useEffect } from "react";
import Cell from "./Cell";

const GameBoard = () => {
    const [cells, setCells] = useState(Array(9).fill(false)); // Scratch status
    const [symbols, setSymbols] = useState([]); // Hidden letters/symbols
    const [baseReward, setBaseReward] = useState(0); // Base reward from regular symbols
    const [totalReward, setTotalReward] = useState(0); // Final reward after calculations
    const [outcome, setOutcome] = useState(""); // Game outcome (win/lose)

    // Initialize the game state
    const initializeGame = () => {
        const symbolSet = ["⭐", "🍀", "💎", "🌈", "🍭"]; // Special symbols
        const regularSymbols = ["A", "B", "C", "D", "E", "F"]; // Regular symbols

        // Select one special symbol for the game board
        const specialSymbol = symbolSet[Math.floor(Math.random() * symbolSet.length)];
        const randomizedSymbols = Array(9).fill(null);

        // Place the special symbol in a random cell
        const specialIndex = Math.floor(Math.random() * 9);
        randomizedSymbols[specialIndex] = specialSymbol;

        // Fill the remaining cells with regular symbols
        randomizedSymbols.forEach((_, index) => {
            if (randomizedSymbols[index] === null) {
                randomizedSymbols[index] =
                    regularSymbols[Math.floor(Math.random() * regularSymbols.length)];
            }
        });

        setSymbols(randomizedSymbols); // Update symbols
        setCells(Array(9).fill(false)); // Reset scratch status
        setBaseReward(0); // Reset base reward
        setTotalReward(0); // Reset total reward
        setOutcome(""); // Reset outcome
    };

    useEffect(() => {
        initializeGame(); // Initialize the game on component mount
    }, []);

    const handleScratch = (index) => {
        if (!cells[index]) {
            const newCells = [...cells];
            newCells[index] = true;
            setCells(newCells);

            // Check if all cells are scratched
            if (newCells.every((revealed) => revealed)) {
                calculateOutcome(symbols[index]); // Pass the scratched special symbol to calculateOutcome
            }
        }
    };

    const calculateOutcome = () => {
        // Count occurrences of regular symbols
        const symbolCount = {};
        symbols.forEach((symbol) => {
            symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
        });

        // Find regular symbols appearing 3 or more times
        const winningSymbols = Object.keys(symbolCount).filter(
            (key) =>
                symbolCount[key] >= 3 &&
                !["⭐", "🍀", "💎", "🌈", "🍭"].includes(key) // Exclude special symbols
        );

        let baseReward = 0;

        if (winningSymbols.length > 0) {
            let message = "You Win! Symbols with rewards: ";

            // Calculate the base reward from winning symbols
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

                baseReward += symbolReward; // Sum up rewards for winning symbols
                message += ` "${symbol}" (${symbolCount[symbol]} times, Reward: ${symbolReward}) `;
            });

            // Apply the special symbol
            let finalReward = baseReward;
            const specialSymbol = symbols.find((s) =>
                ["⭐", "🍀", "💎", "🌈", "🍭"].includes(s)
            );

            switch (specialSymbol) {
                case "⭐":
                    finalReward *= 10; // Multiply by 10
                    break;
                case "🍀":
                    finalReward *= 5; // Multiply by 5
                    break;
                case "💎":
                    finalReward += 1000; // Add 1000
                    break;
                case "🌈":
                    finalReward += 500; // Add 500
                    break;
                case "🍭":
                    break; // MISS does not affect the reward
                default:
                    break;
            }

            setBaseReward(baseReward); // Update base reward state
            setTotalReward(finalReward); // Update total reward
            message += ` with Special Symbol (${specialSymbol}), Final Reward: ${finalReward}`;
            setOutcome(message.trim());
        } else {
            // If no winning symbols, calculate reward based solely on special symbol
            let finalReward = 0;

            const specialSymbol = symbols.find((s) =>
                ["⭐", "🍀", "💎", "🌈", "🍭"].includes(s)
            );

            switch (specialSymbol) {
                case "⭐":
                    finalReward = baseReward * 10; // Multiply by 10
                    break;
                case "🍀":
                    finalReward = baseReward * 5; // Multiply by 5
                    break;
                case "💎":
                    finalReward = 1000; // Reward is 1000
                    break;
                case "🌈":
                    finalReward = 500; // Reward is 500
                    break;
                case "🍭":
                    finalReward = 0; // No reward for MISS
                    break;
                default:
                    break;
            }

            setTotalReward(0); // Update total reward
            setOutcome(
                `You Lose! No Winning Combination available. Special Reward (${specialSymbol})`
            );
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
            {outcome && <button onClick={initializeGame} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                Scratch Again
            </button>}
        </div>
    );
};

export default GameBoard;
