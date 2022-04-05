import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

type HomeScreenProps = NativeStackScreenProps<LoggedInParamList, 'Home'>;

function Home({ navigation }: HomeScreenProps) {
  const toAnimalUpload = useCallback(() => {
    navigation.navigate('AnimalUpload');
  }, [navigation]);

  const toDogam = useCallback(() => {
    navigation.navigate('Dogam');
  }, [navigation]);

  const toAchievement = useCallback(() => {
    navigation.navigate('Achievement');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.mainButton} onPress={toAnimalUpload}>
        <Text style={styles.buttonText}>동물 수집하기</Text>
      </Pressable>
      <Pressable style={styles.mainButton} onPress={toDogam}>
        <Text style={styles.buttonText}>나의 도감</Text>
      </Pressable>
      <Pressable style={styles.mainButton} onPress={toAchievement}>
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
