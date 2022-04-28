import React, { useCallback, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { useAppDispatch } from '../store';
import photoSlice, { Photo } from '../slices/photo';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import FastImage from 'react-native-fast-image';
import DogamAnimals from '../animations/DogamAnimals';
import lessAnimalSlice from '../slices/lessAnimal';
import * as Progress from 'react-native-progress';

function Dogam() {
  const animalPhotos = useSelector((state: RootState) => state.photo.photos);
  const lessAnimalList = useSelector(
    (state: RootState) => state.lessAnimal.lessAnimalList,
  );
  const lessAnimalNum = useSelector(
    (state: RootState) => state.lessAnimal.lessAnimalNum,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getPhotos() {
      const response = await axios.get<{ data: Photo[] }>(
        `${Config.API_URL}/book/list/has`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      dispatch(photoSlice.actions.loadPhotos(response.data));
    }
    getPhotos();
  }, [dispatch]);

  useEffect(() => {
    async function getPhotos() {
      const response = await axios.get<{ data: String[] }>(
        `${Config.API_URL}/book/list/less`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      dispatch(lessAnimalSlice.actions.setLessAnimal(response.data));
    }
    getPhotos();
  }, [dispatch]);
  //console.log(animalPhotos);

  const renderItem = useCallback(({ item }: { item: Photo }) => {
    return (
      <View style={styles.photoContainer}>
        <FastImage
          source={{ uri: `${Config.API_URL}/book/${item.photo}` }}
          resizeMode="cover"
          style={styles.photoWrapper}
        />
        <Text style={styles.animalNameText}>{item.animalName}</Text>
      </View>
    );
  }, []);

  let collectionRate = animalPhotos.length / 100;

  return (
    <View style={styles.container}>
      <View style={styles.collectionRateContainer}>
        <View style={styles.animationWrapper}>
          <DogamAnimals style={styles.animationStyle} />
        </View>
        <View style={styles.collectionRateTextWrapper}>
          <Text style={styles.collectionRateText}>
            도감 수집률 ({animalPhotos.length}/100)
          </Text>
          <Progress.Bar progress={collectionRate} width={200} color="orange" />
        </View>
      </View>
      <View style={styles.photoGrid}>
        <FlatList
          data={animalPhotos}
          keyExtractor={(o) => o.no}
          numColumns={3}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

export default Dogam;

const styles = StyleSheet.create({
  photoWrapper: {
    height: Dimensions.get('window').width / 3 - 20,
    width: Dimensions.get('window').width / 3 - 20,
    backgroundColor: 'yellow',
    margin: 5,
  },
  photoContainer: {
    borderWidth: 0.7,
    alignItems: 'center',
  },
  collectionRateContainer: {
    borderWidth: 0.5,
    margin: 10,
    borderRadius: 10,
    height: Dimensions.get('window').height / 6,
    flexDirection: 'row',
  },
  collectionRateText: {
    fontSize: 20,
    fontFamily: 'ONEMobileBold',
    color: 'black',
    marginBottom: 10,
  },
  collectionRateTextWrapper: {
    flex: 7,
    justifyContent: 'center',
    marginLeft: 10,
  },
  animationWrapper: {
    flex: 3,
    alignItems: 'center',
    margin: 5,
  },
  animalNameText: {
    fontFamily: 'ONEMobileBold',
    fontSize: 18,
  },
  animationStyle: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  photoGrid: {
    flex: 1,
    marginHorizontal: 10,
  },
});
