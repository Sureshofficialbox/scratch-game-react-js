import React from 'react';

const BonusCell = ({ revealed, bonus, onScratch }) => {
  return (
    <button
      onClick={onScratch}
      style={{
        width: '60px',
        height: '60px',
        margin: '5px',
        backgroundColor: revealed ? (bonus > 0 ? 'gold' : 'lightcoral') : 'darkgrey',
        border: '2px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: revealed ? '0px 0px 10px 2px #ffa' : '0px 0px 5px 1px #666',
      }}
    >
      {revealed ? (bonus > 0 ? `Bonus: +${bonus}` : '😢 Try Again!') : ''}
    </button>
  );
};

export default BonusCell;
