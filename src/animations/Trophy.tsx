import React from 'react';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
// import LottieView = require('lottie-react-native'); // otherwise you have "esModuleInterop": false
type StyleProps = {
  style: { height: string };
};

function Trophy({ style }: StyleProps) {
  return (
    <LottieView
      source={require('../../assets/animations/trophy.json')}
      autoPlay
      resizeMode="contain"
      loop={false}
      style={style}
    />
  );
}

export default Trophy;
