import React, { useCallback, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { useAppDispatch } from '../store';
import photoSlice, { Photo } from '../slices/photo';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import FastImage from 'react-native-fast-image';

function Dogam() {
  const animalPhotos = useSelector((state: RootState) => state.photo.photos);
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

  console.log(animalPhotos);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={animalPhotos}
        keyExtractor={(o) => o.no}
        numColumns={3}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Dogam;

const styles = StyleSheet.create({
  photoWrapper: {
    height: Dimensions.get('window').width / 3 - 10,
    width: Dimensions.get('window').width / 3 - 10,
    backgroundColor: 'yellow',
    margin: 5,
  },
  photoContainer: {
    borderWidth: 0.7,
    alignItems: 'center',
  },
  animalNameText: {
    fontFamily: 'ONEMobileBold',
    fontSize: 18,
  },
  container: {
    backgroundColor: 'white',
  },
});
