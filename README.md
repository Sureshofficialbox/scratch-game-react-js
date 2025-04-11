
# Scratch Game 🎮 **[WANT TO GO LIVE GAME: Click here](https://Sureshofficialbox.github.io/scratch-game-react-js/)**

Experience the thrill of the Scratch Game live by clicking the link above!
WANT TO GO LIVE GAME: Click here

## Description
Scratch Game is a fun and interactive web application where users can "scratch" cells to uncover hidden symbols and win rewards. Built using React and Vite, this project demonstrates modern web development techniques and provides an engaging gaming experience.

## Features
- 🎲 Randomly generated symbols for every game.
- 🌟 Special rewards like multipliers (`⭐`, `🍀`) and bonuses (`💎`, `🌈`).
- 🧩 Responsive design for a seamless experience on any device.
- 🛠 Built with React and Vite for fast performance.
- 🔁 "Scratch Again" button for restarting the game anytime.

## Screenshots
![image](https://github.com/user-attachments/assets/09143585-9040-48d7-9376-0b9767a8040f)
![image](https://github.com/user-attachments/assets/16ba150b-d0c3-47c5-a7b0-c45338ac5dd7)

## Reward Calculation Logic

The points for symbols are as mentioned in the below table

![image](https://github.com/user-attachments/assets/0fad0037-0fa0-439e-86b9-231ac9a484b9)

![image](https://github.com/user-attachments/assets/bbaa6d1d-872f-4ea5-8ba5-5a00a729e6f8)

Winning Condition: 
Reward will be calculated only if a symbols occurance is greater than or equal to 3.

Example
![image](https://github.com/user-attachments/assets/039bbe35-a117-41f2-97f7-10ef9aed5dca)

In the above image as the symbol B has occured 3 times,as the condition has been satisfied the APP enters into reward calculation.
Reward Calculation: 
Value of B=75
Occurance of B=3 times
Reward = Value of B X Occurance of B
       = 75 X 3
       = 225
Special Symbol Calculation:
The Special symbol calculation will be taken into account only if the winning condition is satisfied.
value of special symbol [![image](https://github.com/user-attachments/assets/0863b52d-3901-4507-90c7-73059e74e92a)] = 1000

Total Reward = Reward + Special Symbol Value
             = 225 + 1000
       Total Reward: 1225 🎉
             

Bonus:
The bonus will be taken into account only if the above mentioned winning condition is satisfied.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sureshofficialbox/scratch-game-react-js.git
   cd scratch-game-react-js
   npm install
   npm run dev
   http://localhost:3000

---

## Deployment

The Scratch Game is live and available to play online! 🎮

### Deployment Details:
- The project is deployed on **GitHub Pages**, a free and reliable hosting platform for static websites.
- The production-ready files were built using Vite and pushed to the `gh-pages` branch of the GitHub repository.
- GitHub Pages serves the app directly from the subdirectory `/scratch-game-react-js/` under the repository.

### How to Access the Live Game:
- You can play the Scratch Game by visiting:  
  **[Scratch Game Live](https://Sureshofficialbox.github.io/scratch-game-react-js)**

### How It Works:
1. **Build Process**:
   - Run `npm run build` to generate optimized production files in the `dist` folder.
2. **Deployment Command**:
   - Use `gh-pages` to deploy the `dist` folder to the `gh-pages` branch:
     ```bash
     npm run deploy
     ```
3. **Hosting**:
   - GitHub Pages is automatically configured to serve the app from the `gh-pages` branch.

Enjoy the game live and test your luck by scratching to win exciting rewards! ✨


## Deployment
The game is live and accessible at:
[Scratch Game on GitHub Pages](https://Sureshofficialbox.github.io/scratch-game-react-js/)

## Technologies Used
- React: For building the user interface.
- Vite: For blazing-fast builds and hot module replacement.
- GitHub Pages: For deployment.
- JavaScript (ES6+): For interactivity.
- HTML5 & CSS3: For layout and styling.

## How to Play
1. Click on any cell to reveal the hidden symbol.
2. Find matching symbols to earn rewards.
3. Special symbols like `⭐` and `🍀` increase your winnings with multipliers and bonuses.
4. Click "Scratch Again" to start a new game!







