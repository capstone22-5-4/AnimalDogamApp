import React from 'react';
import { Text,StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';



function AnimalUpload() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://dongmul-dogam-ichox.run.goorm.io/dongmul_dogam/index.html' }} />
    
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default AnimalUpload;
