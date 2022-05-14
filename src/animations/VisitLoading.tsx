import React from 'react';
import LottieView from 'lottie-react-native'; // if you have "esModuleInterop": true
// import LottieView = require('lottie-react-native'); // otherwise you have "esModuleInterop": false
type StyleProps = {
  style: { height: string };
};

function VisitLoading({ style }: StyleProps) {
  return (
    <LottieView
      source={require('../../assets/animations/visitLoading.json')}
      autoPlay
      resizeMode="contain"
      style={style}
    />
  );
}

export default VisitLoading;
