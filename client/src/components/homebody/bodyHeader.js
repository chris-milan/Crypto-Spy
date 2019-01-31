import React from 'react';
import './homebody.css';

const BodyHeader = () => {
  return (
    <div className="row">
      <div className="col">
        <h3 className="bodyHeaderTitles">#</h3>
        <h3 className="bodyHeaderTitles">Name</h3>
        <h3 className="bodyHeaderTitles rightFloat">Mentions</h3>
      </div>
      <div className="col faded">
        <h3 className="bodyHeaderTitles">#</h3>
        <h3 className="bodyHeaderTitles">Name</h3>
        <h3 className="bodyHeaderTitles rightFloat">Mentions</h3>
      </div>
    </div>
  );
};

export default BodyHeader;
