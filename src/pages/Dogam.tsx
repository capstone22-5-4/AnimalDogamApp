/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import { useAppDispatch } from '../store';
import photoSlice, { Photo } from '../slices/photo';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import FastImage from 'react-native-fast-image';
import DogamAnimals from '../animations/DogamAnimals';
import lessAnimalSlice from '../slices/lessAnimal';
import * as Progress from 'react-native-progress';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface IEncyclo {
  [key: string]: { [key: string]: string };
}

const encycloData = require('../data/encyclo.json');
const encyclo: IEncyclo = encycloData;

function Dogam() {
  //const credits = useSelector((state: RootState) => state.user.credit);
  const [modalVisible, setModalVisible] = useState(false);
  const [animalName, setAnimalName] = useState('');
  const [lessAnimalModalVisible, setLessAnimalModalVisible] = useState(false);

  const animalPhotos = useSelector((state: RootState) => state.photo.photos);

  const lessAnimalList = useSelector(
    (state: RootState) => state.lessAnimal.lessAnimalList,
  );
  // const lessAnimalNum = useSelector(
  //   (state: RootState) => state.lessAnimal.lessAnimalNum,
  // );

  const goDetail = (name: string) => {
    setAnimalName(name);
    setModalVisible(true);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getPhotos() {
      try {
        const response = await axios.get<{ data: Photo[] }>(
          `${Config.API_URL}/book/list/has`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
          },
        );
        dispatch(photoSlice.actions.loadPhotos(response.data));
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        console.log(errorResponse);
      }
      //console.log(response.data);
    }
    async function getLessAnimals() {
      const response = await axios.get<{ data: String[] }>(
        `${Config.API_URL}/book/list/less`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        },
      );
      dispatch(lessAnimalSlice.actions.setLessAnimal(response.data));
      //console.log(response.data);
    }
    getPhotos();
    getLessAnimals();
  }, [dispatch]);

  const renderItem = useCallback(({ item }: { item: Photo }) => {
    return (
      <View style={styles.photoContainer}>
        <Pressable onPress={() => goDetail(item.animalName)}>
          <FastImage
            source={{ uri: `${Config.API_URL}/book/${item.photo}` }}
            resizeMode="cover"
            style={styles.photoWrapper}
          />
          <Text style={styles.animalNameText}>{item.animalName}</Text>
        </Pressable>
      </View>
    );
  }, []);

  let collectionRate = animalPhotos.length / 61;
  //console.log({ credits });

  return (
    <View style={styles.container}>
      <View style={styles.collectionRateContainer}>
        <View style={styles.animationWrapper}>
          <DogamAnimals style={styles.animationStyle} />
        </View>
        <View style={styles.collectionRateTextWrapper}>
          <Text style={styles.collectionRateText}>
            도감 수집률 ({animalPhotos.length}/61)
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
      {modalVisible ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.encycloContainer}>
            <ImageBackground
              source={require('../../images/blackboard_bg.jpg')}
              resizeMode="stretch"
              style={styles.background}
            >
              <Text style={styles.animalNameInEncycloText}>{animalName}</Text>
              <Text style={styles.descriptionText}>
                {encyclo[animalName].description}
              </Text>
              <View style={styles.closeButtonContainer}>
                <Pressable
                  style={styles.detailButton}
                  onPress={() => Linking.openURL(encyclo[animalName].link)}
                >
                  <Text style={styles.closeButtonText}>더 알아보기</Text>
                </Pressable>
              </View>
              <View style={styles.closeButtonContainer}>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>닫기</Text>
                </Pressable>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      ) : null}
      <Pressable
        style={styles.lessAnimalButton}
        onPress={() => setLessAnimalModalVisible(true)}
      >
        <FontAwesome5Icon name="book-open" size={20} color={'white'} />
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={lessAnimalModalVisible}
        onRequestClose={() => {
          setLessAnimalModalVisible(!lessAnimalModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.lessAnimalListContainer}>
            <Text style={styles.lessAnimalTitle}>
              내가 아직 만나지 못한 동물들
            </Text>
            <FlatList
              data={lessAnimalList}
              numColumns={1}
              renderItem={({ item }) => (
                <Text style={styles.lessAnimalsName}>{item}</Text>
              )}
              disableVirtualization={false}
            />
            

            <View style={styles.closeButtonContainer}>
              <Pressable
                style={[styles.closeButton, { margin: 20 }]}
                onPress={() => setLessAnimalModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Dogam;

const styles = StyleSheet.create({
  lessAnimalsName: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'OneMobileRegular',
    margin: 5,
  },
  lessAnimalTitle: {
    fontSize: 30,
    margin: 10,
    fontFamily: 'Cafe24Shiningstar',
    color: '#000',
  },
  lessAnimalButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FF6300',
    position: 'absolute',
    bottom: 20,
    right: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lessAnimalListContainer: {
    backgroundColor: '#FFE8C9',
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height - 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  animalNameInEncycloText: {
    color: 'yellow',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 20,
    fontFamily: 'OneMobileTitle',
  },
  descriptionText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'KOTRA_Songuelssi',
    margin: 10,
    lineHeight: 30,
  },
  encycloContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    backgroundColor: '#F27E00',
  },
  detailButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    backgroundColor: '#4c0000',
  },
  closeButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'OneMobileBold',
    fontSize: 15,
  },
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
    textAlign: 'center',
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
    marginBottom: 15,
  },
});
