import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

import OverviewBody from '../../components/overviewbody/overviewBody';

const SingleCoin = () => {
  return (
    <div className="container">
      <Header />
      <div className="pageBody">
        <OverviewBody />
      </div>
      <Footer />
    </div>
  );
};

export default SingleCoin;