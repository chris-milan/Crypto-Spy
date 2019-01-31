import React from 'react';
import LeftFloat from './header/leftFloat';
import RightFloat from './header/rightFloat';
import './body.css';

const Header = () => {
  return (
    <header className="row">
      <LeftFloat />
      <RightFloat />
    </header>
  );
};

export default Header;
