import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

function AnimalUpload() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'http://3.35.222.94:8880/analmal',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AnimalUpload;
