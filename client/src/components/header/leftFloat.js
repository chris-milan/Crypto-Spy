import React from 'react';
import Logo from './logo';
import Tagline from './tagline';
import './header.css';

const LeftFloat = () => {
  return (
    <div className="col">
      <div className="leftFloat">
        <Logo />
        <Tagline />
      </div>
    </div>
  );
};

export default LeftFloat;
