import React from 'react';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
// import LottieView = require('lottie-react-native'); // otherwise you have "esModuleInterop": false
type StyleProps = {
  style: { height: string };
};

function BuySuccess({ style }: StyleProps) {
  return (
    <LottieView
      source={require('../../assets/animations/buy_success.json')}
      autoPlay
      resizeMode="contain"
      style={style}
      loop={false}
    />
  );
}

export default BuySuccess;
