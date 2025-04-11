import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Scratch Game 🎮</h1>
      <GameBoard />
    </div>
  );
};

export default App;
