import React from 'react';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
// import LottieView = require('lottie-react-native'); // otherwise you have "esModuleInterop": false
type StyleProps = {
  style: { height: string };
};

function Elephant({ style }: StyleProps) {
  return (
    <LottieView
      source={require('../../assets/animations/elephant.json')}
      autoPlay
      resizeMode="contain"
      loop
      style={style}
    />
  );
}

export default Elephant;
