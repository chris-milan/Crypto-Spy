import React from 'react';
import MentionsChange from './mentionsChange';
import PercentOfMentionsAllCoins from './percentOfMentionsAllCoins';
import TotalMentions from './totalMentions';
import TwentyFourHourMentions from './twentyFourHourMentions';
import './aside.css';

const MentionData = ({ data }) => {
  return (
    <div className="mentionDataBox">
      <TotalMentions key={1} data={data.totalMentions} />
      <PercentOfMentionsAllCoins key={2} data={data.allCoinsMentionsPercent} />
      <TwentyFourHourMentions key={3} data={data.TwentyFourHr} />
    </div>
  );
};

export default MentionData;
