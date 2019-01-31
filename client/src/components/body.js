import React from 'react';
import HomeBody from './homebody/homeBody'; // What we use to display the homepage with lists of coins 1-20 at start
import './body.css';

const Body = () => {
  return (
    <div className="pageBody">
      <HomeBody />
    </div>
  );
};

export default Body;
