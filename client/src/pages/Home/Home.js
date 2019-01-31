import React from 'react';
import Header from '../../components/header';
import HomeBody from '../../components/homebody/homeBody';

const Home = () => {
  return (
    <div className="container">
      <Header />
      <div className="pageBody">
        <HomeBody />
      </div>
      <div className="pageBody" />
    </div>
  );
};

export default Home;