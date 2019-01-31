import React from 'react';
import './aside.css';

const TotalMentions = ({ data }) => {
  return <div className="mentionDataDisplay">Total Mentions: {data}</div>;
};

export default TotalMentions;
