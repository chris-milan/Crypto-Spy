import React from 'react';
import Typed from 'react-typed';
import './header.css';

const Tagline = () => {
  return (
    <div className="tagline">
      <Typed strings={['See what people are saying...']} typeSpeed={30} />
    </div>
  );
};

export default Tagline;
