import React from 'react';
import Whispers from './whispers';
import Spinner from '../../common/Spinner';
import './visualFeedBox.css';

const WhisperBox = ({ data }) => {
  console.log(data);

  let elWhisper = <Spinner />;

  if (typeof data.whispers !== 'undefined') {
    elWhisper = data.whispers.map(whisper => (
      <Whispers
        key={whisper.whisper + Math.random()}
        whispers={whisper.whisper}
      />
    ));
  }

  return <div className="whisperBox">{elWhisper}</div>;
};

export default WhisperBox;
