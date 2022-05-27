import React from 'react';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
// import LottieView = require('lottie-react-native'); // otherwise you have "esModuleInterop": false
type StyleProps = {
  style: { height: string };
};

function QuestConfetti({ style }: StyleProps) {
  return (
    <LottieView
      source={require('../../assets/animations/quest_confetti.json')}
      autoPlay
      resizeMode="contain"
      style={style}
      loop={false}
    />
  );
}

export default QuestConfetti;
