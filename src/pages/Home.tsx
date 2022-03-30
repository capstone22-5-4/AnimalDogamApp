import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.mainButton}
        onPress={() => {
          navigation.navigate('AnimalUpload');
        }}
      >
        <Text style={styles.buttonText}>동물 수집하기</Text>
      </Pressable>
      <Pressable
        style={styles.mainButton}
        onPress={() => navigation.navigate('Dogam')}
      >
        <Text style={styles.buttonText}>나의 도감</Text>
      </Pressable>
      <Pressable
        style={styles.mainButton}
        onPress={() => {
          navigation.navigate('Achievement');
        }}
      >
        <Text style={styles.buttonText}>나의 업적</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainButton: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Home;
