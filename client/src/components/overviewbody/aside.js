import React from 'react';
import MentionData from './aside/mentionData';
import SaveData from './aside/saveData';
import './overviewbody.css';

const Aside = ({ data, thePath }) => {
  return (
    <div>
      <div className="overViewCoinName">
        {data.name} ({data.symbol})
      </div>
      <MentionData key={1} data={data} />
      <SaveData key={2} saveData={data} thePath={thePath} />
    </div>
  );
};

export default Aside;
