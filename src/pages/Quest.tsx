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
import Chicken from '../animations/Chicken';
import photoSlice, { Photo } from '../slices/photo';
import { useAppDispatch } from '../store';
import { RootState } from '../store/reducer';

function Quest() {
  const [flag, setFlag] = useState(false);
  const [visitModalVisible, setVisitModalVisible] = useState(false);
  const [feedlistModalVisible, setfeedlistModalVisible] = useState(false);
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
  /*
  7가지 판매
  풀 - 기린 닭 사슴 코끼리
  물고기 - 여우, 수달
  소고기 - 고양이, 호랑이, 여우
  지렁이 - 비둘기, 거북이
  사료 - 강아지
  과일 - 코끼리 비둘기 여우
  */
  const feedanimalmatch = () =>{
    if (pressedAnimalName=="닭"){
      <Text>풀</Text>
      return <Chicken style={styles.animationStyle} /> 
    }
    if (pressedAnimalName=="기린"){
      return <Text>풀</Text>
    }
    if (pressedAnimalName=="사슴"){
      return <Text>풀 과일</Text>
    }
    if (pressedAnimalName=="코끼리"){
      return <Text>풀</Text>
    }
    if (pressedAnimalName=="여우"){
      return <Text>물고기 소고기 과일</Text>
    }
    if (pressedAnimalName=="수달"){
      return <Text>물고기</Text>
    }
    if (pressedAnimalName=="고양이"){
      return <Text>소고기</Text>
    }
    if (pressedAnimalName=="호랑이"){
      return <Text>소고기</Text>
    }
    if (pressedAnimalName=="비둘기"){
      return <Text>지렁이 과일</Text>
    }
    if (pressedAnimalName=="거북"){
      return <Text>지렁이</Text>
    }
    if (pressedAnimalName=="강아지"){
      return <Text>사료</Text>
    }


  }
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
        animationType="slide"
        transparent={true}
        visible={feedlistModalVisible}
        onRequestClose={() => {
          setfeedlistModalVisible(!feedlistModalVisible);
        }}

      >
        <View style={styles.encycloContainer}>
          <View style = {styles.feedhavetextContainer}>
          {feedanimalmatch()}
            
          </View>
          <Pressable
          style={[styles.ModalbuttonContainer]}
          onPress={() => setfeedlistModalVisible(!feedlistModalVisible)}
          >
          <Text style={styles.visitButtonText}>예</Text>
          </Pressable>
        </View>

      </Modal>



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
              <Pressable style={styles.closeButton} onPress={() => {
                  setfeedlistModalVisible(true)

// 먹이 보유 리스트 보여주기
// 먹이선택시 동물이랑 비교-> 먹을 수 있는지 -> 성공/ 실패 -> 성공시 애니메이션, 실패시 동물이 못먹는 먹이
// 퀘스트 부분 성공
              }}>
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
  encycloContainer: {
    flex: 1,
    backgroundColor: 'transpart',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedhavetextContainer:{
    width: 250,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor : '#FFF7EB',
    flexDirection: 'row'

  },ModalbuttonContainer: {
    padding: 5,
    alignItems: 'center',
    paddingHorizontal: 25,
    
  },
});
