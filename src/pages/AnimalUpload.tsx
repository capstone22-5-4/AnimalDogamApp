import React from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { WebView } from 'react-native-webview';

function AnimalUpload() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `${Config.API_URL}/analmal`,
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
