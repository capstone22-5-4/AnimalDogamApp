import React, { useCallback, useEffect } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
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
      <FastImage
        source={{ uri: `${Config.API_URL}/book/${item.photo}` }}
        resizeMode="contain"
        style={{
          height: Dimensions.get('window').width / 2,
          width: Dimensions.get('window').width / 2,
        }}
      />
    );
  }, []);

  return (
    // <Image
    //   source={{ uri: 'http://3.35.222.94:8880/book/undifined.jpg' }}
    //   style={{ width: 156, height: 112 }}
    // />
    <View>
      <FlatList
        data={animalPhotos}
        keyExtractor={(o) => o.no}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Dogam;
