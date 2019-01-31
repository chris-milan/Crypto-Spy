import React from 'react';
import './aside.css';

const PercentOfMentionsAllCoins = ({ data }) => {
  return (
    <div className="mentionDataDisplay">
      Total Mentions (All Cryptos): {data}%
    </div>
  );
};

export default PercentOfMentionsAllCoins;
