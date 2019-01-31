import React from 'react';
import './visualFeedBox.css';

const Whispers = ({ whispers }) => {
  return (
    <div>
      <div className="individualWhisper"> {whispers}</div>
    </div>
  );
};

export default Whispers;
