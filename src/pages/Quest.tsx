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
import Tiger from '../animations/Tiger';
import Turtle from '../animations/Turtle';
import photoSlice, { Photo } from '../slices/photo';
import { useAppDispatch } from '../store';
import { RootState } from '../store/reducer';
import foodSlice from '../slices/food';
import coinSlice from '../slices/user';
import axios, { AxiosError } from 'axios';


function Quest() {
  const [flag, setFlag] = useState(false);
  const [visitModalVisible, setVisitModalVisible] = useState(false);
  const [feedlistModalVisible, setfeedlistModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [nofeedModalVisible, setnofeedModalVisible] = useState(false);
  const [thanksModalVisible, setthanksModalVisible] = useState(false);
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
 
  let 물고기= useSelector((state: RootState) => state.food.물고기);
  let 풀 = useSelector((state: RootState) => state.food.풀);
  let 소고기 = useSelector((state: RootState) => state.food.소고기);
  let 지렁이 = useSelector((state: RootState) => state.food.지렁이);
  let 사료 = useSelector((state: RootState) => state.food.사료);
  let 과일 = useSelector((state: RootState) => state.food.과일);

  const [nofeedstate, setnofeedstate] = useState(false);
  const [feeditems, setfeeditems] = useState([
    { id: 0, num: 물고기 },
    { id: 1, num: 풀 }, 
    { id: 2, num: 소고기 },
    { id: 3, num: 지렁이 },
    { id: 4, num: 사료 },
    { id: 5, num: 과일 },
  ]);

  useEffect(() => {
    feeditems[0].num=물고기
    feeditems[1].num=풀
    feeditems[2].num=소고기
    feeditems[3].num=지렁이
    feeditems[4].num=사료
    feeditems[5].num=과일
  },[물고기,풀,소고기,지렁이,사료,과일]);

  // 서버에서 사용자의 먹이 불러와서 redux에 저장하기
  useEffect(() => {
    async function loadCoin() {
      try {
        const response = await axios.get(`${Config.API_URL}/credit`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });
        dispatch(coinSlice.actions.setCredit(response.data));
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        console.log(errorResponse);
      }
    }
    loadCoin();
    async function loadFood() {
      try {
        const response = await axios.get(`${Config.API_URL}/foodlist`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });
        dispatch(foodSlice.actions.setFood(response.data));
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        console.log(errorResponse);
      }
    }
    loadFood();
    
  }, [dispatch, feeditems,물고기,풀,소고기,지렁이,사료,과일]);



  let usefeed = async ()=>{
    console.log("들어옴")
    setnofeedstate(false)
    if (pressedAnimalName=="닭"){
      if (feeditems[1].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use풀`)
      }
      else{
        setnofeedstate(true)
      }
      
    }
    if (pressedAnimalName=="기린"){
      if (feeditems[1].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use풀`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="사슴"){
      if (feeditems[1].num>=1 && feeditems[5].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use풀`)
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use과일`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="코끼리"){
      if (feeditems[1].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use풀`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="여우"){
      if (feeditems[0].num>=1 && feeditems[2].num>=1 && feeditems[5].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 0
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use물고기`)
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use소고기`)
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use과일`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="수달"){
      if (feeditems[0].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 0
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use물고기`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="고양이"){
      if (feeditems[2].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use소고기`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="호랑이"){
      if (feeditems[2].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use소고기`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="비둘기"){
      if (feeditems[3].num>=1 && feeditems[5].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 3
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use지렁이`)
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use과일`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="거북"){
      if (feeditems[3].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 3
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use지렁이`)
      }
      else{
        setnofeedstate(true)
      }
    }
    if (pressedAnimalName=="강아지"){
      if (feeditems[4].num>=1){
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id == 4
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
        await axios.get(`${Config.API_URL}/use사료`)
      }
      else{
        setnofeedstate(true)
      }
    }

  }


  const feedanimalmatch = () =>{
    if (pressedAnimalName=="닭"){
      return <Text>풀</Text>
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

  const animationMatch = () =>{
    if (pressedAnimalName=="닭"){
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
      return <Tiger style={styles.animationStyle} />
    }
    if (pressedAnimalName=="비둘기"){
      return <Text>지렁이 과일</Text>
    }
    if (pressedAnimalName=="거북"){
      return <Turtle style={styles.animationStyle} />
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
        visible={nofeedModalVisible}
        onRequestClose={() => {
          setnofeedModalVisible(!nofeedModalVisible);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.buyresultContainer}>
            <View style={styles.buyresultTextContainer}>
              <Text style={styles.ModalText}>먹이가 부족해요!</Text>
            </View>
            <Pressable
              style={[styles.ModalbuttonContainer]}
              onPress={() => {setnofeedModalVisible(!nofeedModalVisible)}}
            >
              <Text style={styles.visitButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={thanksModalVisible}
        onRequestClose={() => {
          setnofeedModalVisible(!thanksModalVisible);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.thanksTextContainer}>
            <Text style={styles.ModalbigText}>
              고마워요
            </Text>
            <Text style={styles.ModalbigText}>
              잘 먹겠습니다!!
            </Text>
          </View>
            
          {animationMatch()}
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={feedlistModalVisible}
        onRequestClose={() => {
          setfeedlistModalVisible(!feedlistModalVisible);
        }}

      >
        <View style={styles.encycloContainer}>
          <View style={styles.feedhaveContainer}>
            <Text style={styles.ModalText}>필요한 먹이 리스트</Text>
            
            {feedanimalmatch()}
            

            <View style={styles.feedhavestateContainer}>
              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  {usefeed()}
                  console.log("good",feeditems)
                  if (nofeedstate==true){
                    setnofeedModalVisible(!nofeedModalVisible)
                    setfeedlistModalVisible(!feedlistModalVisible)
                  }else{
                    setthanksModalVisible(!thanksModalVisible)
                    setTimeout(() => setthanksModalVisible(false), 5000);
                  }
                }}
              >
                <Text style={styles.visitButtonText}>예</Text>
              </Pressable>

              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  setfeedlistModalVisible(!feedlistModalVisible)
                }}
              >
                <Text style={styles.visitButtonText}>아니오</Text>
              </Pressable>
            </View>
          </View>
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
  feedhaveContainer:{
    width: 250,
    height: 350,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },ModalbuttonContainer: {
    padding: 5,
    margin: 15,
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#F27E00',
    borderRadius: 10,
    
  },
  feedhavestateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  ModalText: {
    fontSize: 15,
    fontFamily: 'OneMobileRegluar',
    color: 'black',
  },
  ModalbigText: {
    fontSize: 20,
    fontFamily: 'OneMobileRegluar',
    color: 'white',
  },
  buyresultContainer: {
    width: 250,
    height: 150,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  buyresultTextContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thanksTextContainer: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 30,
    //width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    backgroundColor: '#F27E00',
  },
  animationContainer: {
    width: 300,
    height: 300,
    backgroundColor: 'transpart',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
