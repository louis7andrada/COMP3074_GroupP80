import React from 'react'
import { Share, ... } from 'react-native';

const ShareComponent = ({ onShare }) => {
  return (
    <div onClick={onShare}>Share</div>
  );
};

export default ShareComponent;
