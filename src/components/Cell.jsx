import React from 'react';

const Cell = ({ revealed, symbol, onScratch }) => {
  return (
    <button
      onClick={onScratch}
      style={{
        width: '70px',
        height: '70px',
        margin: '5px',
        backgroundColor: revealed ? 'lightblue' : 'grey',
        border: '2px solid #ccc',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      {revealed ? symbol : ''}
    </button>
  );
};

export default Cell;
