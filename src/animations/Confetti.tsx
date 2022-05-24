import React from 'react';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
// import LottieView = require('lottie-react-native'); // otherwise you have "esModuleInterop": false
type StyleProps = {
  style: { height: string };
};

function Confetti({ style }: StyleProps) {
  return (
    <LottieView
      source={require('../../assets/animations/confetti.json')}
      autoPlay
      resizeMode="contain"
      style={style}
    />
  );
}

export default Confetti;
