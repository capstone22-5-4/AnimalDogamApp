import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../AppInner';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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

  const toShop = useCallback(() => {
    navigation.navigate('FeedShop');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.mainButton} onPress={toAnimalUpload}>
        <View style={styles.buttonImageContainer}>
          <Image
            source={require('../../images/char_puang.png')}
            style={styles.buttonImage}
          />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonMainText}>동물 수집하기</Text>
          <Text style={styles.buttonSubText} numberOfLines={1}>
            동물 친구를 발견하셨나요?
          </Text>
        </View>
        <View style={styles.icon}>
          <FontAwesome5Icon name="chevron-right" size={20} />
        </View>
      </Pressable>
      <Pressable style={styles.mainButton} onPress={toDogam}>
        <View style={styles.buttonImageContainer}>
          <Image
            source={require('../../images/home_dogam.png')}
            style={[styles.buttonImage, { width: '80%', height: '80%' }]}
          />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonMainText}>나의 도감</Text>
          <Text style={styles.buttonSubText} numberOfLines={1}>
            나의 동물들을 보러갈까요?
          </Text>
        </View>
        <View style={styles.icon}>
          <FontAwesome5Icon name="chevron-right" size={20} />
        </View>
      </Pressable>
      <Pressable style={styles.mainButton} onPress={toAchievement}>
        <View style={styles.buttonImageContainer}>
          <Image
            source={require('../../images/home_ranking.png')}
            style={styles.buttonImage}
          />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonMainText}>업적</Text>
          <Text style={styles.buttonSubText} numberOfLines={1}>
            달성한 업적이 궁금한가요?
          </Text>
        </View>
        <View style={styles.icon}>
          <FontAwesome5Icon name="chevron-right" size={20} />
        </View>
      </Pressable>
      <Pressable style={styles.mainButton} onPress={toShop}>
        <View style={styles.buttonImageContainer}>
          <Image
            source={require('../../images/main_store.png')}
            style={[styles.buttonImage, { width: '80%', height: '80%' }]}
          />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonMainText}>상점</Text>
          <Text style={styles.buttonSubText} numberOfLines={1}>
            동물들의 먹이가 필요한가요?
          </Text>
        </View>
        <View style={styles.icon}>
          <FontAwesome5Icon name="chevron-right" size={20} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  mainButton: {
    flex: 1,
    borderRadius: 8,
    padding: 6,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

    marginVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 20,
    elevation: 5,
  },
  buttonImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  buttonImageContainer: { flex: 3.5, alignItems: 'center' },
  buttonTextContainer: {
    flex: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 20,
  },
  buttonMainText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'OneMobileBold',
    marginRight: 15,
  },
  buttonSubText: { fontFamily: 'OneMobileRegular', paddingTop: 3 },
  icon: { flex: 0.5 },
});

export default Home;
