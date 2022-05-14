import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import VisitLoading from '../animations/VisitLoading';
import photoSlice, { Photo } from '../slices/photo';
import { useAppDispatch } from '../store';
import { RootState } from '../store/reducer';

function Quest() {
  const [flag, setFlag] = useState(false);
  const [visitModalVisible, setVisitModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [dogamOwnerName, setDogamOwnerName] = useState('');
  const [pressedAnimalName, setPressedAnimalName] = useState('');
  const [pressedAnimalPhoto, setPressedAnimalPhoto] = useState('');

  const otherDogamPhoto = useSelector(
    (state: RootState) => state.photo.otherPhotos,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getFriendDogam() {
      const response = await axios.get(`${Config.API_URL}/book/list/rand`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response.data);
      setDogamOwnerName(response.data[0]);
      dispatch(photoSlice.actions.loadOtherPhotos(response.data));
    }
    getFriendDogam();
  }, [dispatch, flag]);

  const renderItem = useCallback(({ item }: { item: Photo }) => {
    return (
      <View style={styles.photoContainer}>
        <Pressable onPress={() => goDetail(item.animalName, item.photo)}>
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

  const goDetail = (name: string, photo: string) => {
    setPressedAnimalName(name);
    setPressedAnimalPhoto(photo);
    setDetailModalVisible(true);
  };

  const handleVisit = () => {
    setFlag(!flag);
    setLoadingModalVisible(true);
    setTimeout(function () {
      setLoadingModalVisible(false);
      setVisitModalVisible(true);
    }, 3000);
  };

  return (
    <View>
      <View style={styles.visitButtonContainer}>
        <Pressable style={styles.visitButton} onPress={() => handleVisit()}>
          <Text style={styles.visitButtonText}>
            다른 친구의 도감에 방문하기
          </Text>
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={visitModalVisible}
        onRequestClose={() => {
          setVisitModalVisible(!visitModalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitleText}>
              {dogamOwnerName} 님의 도감
            </Text>
          </View>
          <View style={styles.photoGrid}>
            <FlatList
              data={otherDogamPhoto}
              keyExtractor={(o) => o.no}
              numColumns={3}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.closeButtonContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setVisitModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={loadingModalVisible}
        onRequestClose={() => {
          setVisitModalVisible(!loadingModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.visitLoadingModal}>
            <View style={styles.animationWrapper}>
              <VisitLoading style={styles.animationStyle} />
            </View>
            <View style={styles.visitLoadingTextContainer}>
              <Text style={styles.visitLoadingText}>잠시만 기다려주세요.</Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={() => {
          setDetailModalVisible(!detailModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.visitDetailModal}>
            <View style={styles.visitDetailAnimalNameTextContainer}>
              <Text style={styles.visitDetailAnimalNameText}>
                {pressedAnimalName}
              </Text>
            </View>
            <View style={styles.detailPhotoContainer}>
              <FastImage
                source={{ uri: `${Config.API_URL}/book/${pressedAnimalPhoto}` }}
                resizeMode="contain"
                style={styles.detailPhoto}
              />
            </View>
            <View style={styles.feedButtonContainer}>
              <Pressable style={styles.closeButton} onPress={() => {}}>
                <Text style={styles.closeButtonText}>먹이주기</Text>
              </Pressable>
            </View>
            <View style={styles.closeButtonContainer}>
              <Pressable
                style={styles.closeButton}
                onPress={() => setDetailModalVisible(false)}
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

export default Quest;

const styles = StyleSheet.create({
  visitDetailModal: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height * 0.8,
    backgroundColor: '#b8efff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailPhotoContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailPhoto: {
    height: 250,
    width: 250,
    margin: 5,
  },
  visitDetailAnimalNameTextContainer: {
    alignItems: 'center',
    padding: 10,
  },
  visitDetailAnimalNameText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'OneMobileBold',
  },
  visitLoadingTextContainer: {
    alignItems: 'center',
    flex: 1,
  },
  visitLoadingText: {
    fontSize: 30,
    fontFamily: 'Cafe24Shiningstar',
    marginBottom: 20,
  },
  visitLoadingModal: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height / 2,
    position: 'absolute',
    left: 20,
    top: Dimensions.get('window').height / 4,
    borderRadius: 10,
  },
  modalTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  modalTitleText: {
    fontSize: 20,
    fontFamily: 'OneMobileTitle',
  },
  visitButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    backgroundColor: '#F27E00',
  },
  visitButtonContainer: {
    alignItems: 'center',
  },
  visitButtonText: {
    fontSize: 15,
    fontFamily: 'OneMobileRegluar',
    color: 'white',
  },
  feedButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  closeButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    backgroundColor: '#F27E00',
  },
  closeButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'OneMobileBold',
    fontSize: 15,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  animalNameText: {
    fontFamily: 'ONEMobileBold',
    fontSize: 18,
    textAlign: 'center',
  },
  animationStyle: {
    width: '90%',
    height: '90%',
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
