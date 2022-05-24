/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import VisitLoading from '../animations/VisitLoading';
import Chicken from '../animations/Chicken';
import Cat from '../animations/Cat';
import Deer from '../animations/Deer';
import Dog from '../animations/Dog';
import Elephant from '../animations/Elephant';
import Fox from '../animations/Fox';
import Girafe from '../animations/Girafe';
import Pigeon from '../animations/Pigeon';
import Tiger from '../animations/Tiger';
import Turtle from '../animations/Turtle';
import photoSlice, { Photo } from '../slices/photo';
import { useAppDispatch } from '../store';
import { RootState } from '../store/reducer';
import foodSlice from '../slices/food';
import coinSlice from '../slices/user';
import axios, { AxiosError } from 'axios';
import LinearGradient from 'react-native-linear-gradient';

function Quest() {
  const [flag, setFlag] = useState(false);
  const [visitModalVisible, setVisitModalVisible] = useState(false);
  const [feedlistModalVisible, setfeedlistModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [nofeedModalVisible, setnofeedModalVisible] = useState(false);
  const [thanksModalVisible, setthanksModalVisible] = useState(false);
  const [QuestModalVisible, setQuestModalVisible] = useState(false);
  const [yesQuestModalVisible, setyesQuestModalVisible] = useState(false);
  const [dogamOwnerName, setDogamOwnerName] = useState('');
  const [pressedAnimalName, setPressedAnimalName] = useState('');
  const [pressedAnimalPhoto, setPressedAnimalPhoto] = useState('');
  const [questcheck, setquestcheck] = useState(false);
  const [questanimalname, setquestanimalname] = useState('');

  const otherDogamPhoto = useSelector(
    (state: RootState) => state.photo.otherPhotos,
  );

  //퀘스트 랜덤 동물 선정
  const questanimallist = [
    '닭',
    '기린',
    '사슴',
    '코끼리',
    '여우',
    '수달',
    '고양이',
    '호랑이',
    '비둘기',
    '거북',
    '시바견',
  ];
  useEffect(() => {
    changequestanimalname();
  }, []);
  const changequestanimalname = () => {
    const rand_0_10 = Math.floor(Math.random() * 11);
    setquestanimalname(questanimallist[rand_0_10]);
  };

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
    }, 2000);
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

  let 물고기 = useSelector((state: RootState) => state.food.물고기);
  let 풀 = useSelector((state: RootState) => state.food.풀);
  let 소고기 = useSelector((state: RootState) => state.food.소고기);
  let 지렁이 = useSelector((state: RootState) => state.food.지렁이);
  let 사료 = useSelector((state: RootState) => state.food.사료);
  let 과일 = useSelector((state: RootState) => state.food.과일);

  const star = [
    {
      id: false,
      src: require('../../images/emptystar.png'),
    },
    {
      id: true,
      src: require('../../images/star.png'),
    },
  ];

  let nofeedstate1 = false;
  const [feeditems, setfeeditems] = useState([
    { id: 0, num: 물고기 },
    { id: 1, num: 풀 },
    { id: 2, num: 소고기 },
    { id: 3, num: 지렁이 },
    { id: 4, num: 사료 },
    { id: 5, num: 과일 },
  ]);

  useEffect(() => {
    feeditems[0].num = 물고기;
    feeditems[1].num = 풀;
    feeditems[2].num = 소고기;
    feeditems[3].num = 지렁이;
    feeditems[4].num = 사료;
    feeditems[5].num = 과일;
    console.log('아이템', feeditems);
  }, [물고기, 풀, 소고기, 지렁이, 사료, 과일]);

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
  }, [dispatch, feeditems, 물고기, 풀, 소고기, 지렁이, 사료, 과일]);

  async function waitusefeed() {
    await usefeed();
  }

  let usefeed = async () => {
    console.log('이용전 소고기수', feeditems[2].num);

    if (pressedAnimalName === '닭') {
      if (feeditems[1].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use풀`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '기린') {
      if (feeditems[1].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use풀`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '사슴') {
      if (feeditems[1].num >= 1 && feeditems[5].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use풀`);
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use과일`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '코끼리') {
      if (feeditems[1].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use풀`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName == '여우') {
      if (
        feeditems[0].num >= 1 &&
        feeditems[2].num >= 1 &&
        feeditems[5].num >= 1
      ) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 0
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use물고기`);
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use소고기`);
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use과일`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '수달') {
      if (feeditems[0].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 0
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use물고기`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '고양이') {
      if (feeditems[2].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use소고기`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '호랑이') {
      if (feeditems[2].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use소고기`);
        console.log('tiger', feeditems);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '비둘기') {
      if (feeditems[3].num >= 1 && feeditems[5].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 3
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use지렁이`);
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use과일`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '거북') {
      if (feeditems[3].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 3
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use지렁이`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '시바견') {
      if (feeditems[4].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 4
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use사료`);
      } else {
        nofeedstate1 = true;
      }
    }
  };

  const feedanimalmatch = () => {
    if (pressedAnimalName === '닭') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/풀.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'풀'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '기린') {
      return <Text style={styles.feedText}>'풀'</Text>;
    }
    if (pressedAnimalName === '사슴') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/풀.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/과일.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'풀', '과일'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '코끼리') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/풀.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'풀'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '여우') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/물고기.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/소고기.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/과일.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'물고기', '소고기', '과일'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '수달') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/물고기.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'물고기'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '고양이') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/소고기.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'소고기'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '호랑이') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/소고기.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'소고기'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '비둘기') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/지렁이.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/과일.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'지렁이', '과일'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '거북') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/지렁이.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'지렁이'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '시바견') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/사료.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.feedText}>'사료'</Text>
        </View>
      );
    }
  };

  //working
  const animationMatch = () => {
    if (pressedAnimalName === '닭') {
      return <Chicken style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '기린') {
      return <Girafe style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '사슴') {
      return <Deer style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '코끼리') {
      return <Elephant style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '여우') {
      return <Fox style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '수달') {
      return <Text>수달</Text>;
    }
    if (pressedAnimalName === '고양이') {
      return <Cat style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '호랑이') {
      return <Tiger style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '비둘기') {
      return <Pigeon style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '거북') {
      return <Turtle style={styles.animationStyle} />;
    }
    if (pressedAnimalName === '시바견') {
      return <Dog style={styles.animationStyle} />;
    }
  };

  let pluscoinandscore = async () => {
    await axios.get(`${Config.API_URL}/addscore30`);
    await axios.get(`${Config.API_URL}/addcoin30`);
  };

  let plusquestachive = async () => {
    await axios.get(`${Config.API_URL}/putachieve`);
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

      <View style={styles.QuestContainer}>
        <View style={styles.Questiondivide}>
          <View style={styles.QuestTextContainer}>
            <Text style={styles.ModalText}>
              {questanimalname} 에게 먹이주기
            </Text>
          </View>
          <View style={styles.QuestImageContainer}>
            <Image
              source={
                questcheck === false
                  ? require('../../images/emptystar.png')
                  : require('../../images/star.png')
              }
            />
          </View>
        </View>
        <View style={styles.Questiondivide}>
          <Pressable
            style={styles.QuestbuttonContainer}
            onPress={() => {
              if (questcheck === true) {
                setyesQuestModalVisible(!yesQuestModalVisible);
                changequestanimalname();

                //코인, 점수 30씩 추가
                pluscoinandscore();
                //업적 퀘스트 횟수 추가
                plusquestachive();
              } else {
                setQuestModalVisible(!QuestModalVisible);
              }
              setquestcheck(false);
            }}
          >
            <Text style={styles.visitButtonText}>완료</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={yesQuestModalVisible}
        onRequestClose={() => {
          setyesQuestModalVisible(!yesQuestModalVisible);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.buyresultContainer}>
            <View style={styles.buyresultTextContainer}>
              <Text style={styles.ModalText}>퀘스트를 완료했습니다.</Text>
            </View>
            <View style={styles.buyresultTextContainer}>
              <Text style={styles.ModalText}>코인 및 점수가 추가됩니다.</Text>
            </View>
            <Pressable
              style={[styles.ModalbuttonContainer]}
              onPress={() => {
                setyesQuestModalVisible(!yesQuestModalVisible);
              }}
            >
              <Text style={styles.visitButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={QuestModalVisible}
        onRequestClose={() => {
          setQuestModalVisible(!QuestModalVisible);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.buyresultContainer}>
            <View style={styles.buyresultTextContainer}>
              <Text style={styles.ModalText}>퀘스트를 완료해주세요!</Text>
            </View>
            <Pressable
              style={[styles.ModalbuttonContainer]}
              onPress={() => {
                setQuestModalVisible(!QuestModalVisible);
              }}
            >
              <Text style={styles.visitButtonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
              onPress={() => {
                setnofeedModalVisible(!nofeedModalVisible);
              }}
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
          setthanksModalVisible(!thanksModalVisible);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.thanksTextContainer}>
            <Text style={styles.ModalbigText}>고마워요</Text>
            <Text style={styles.ModalbigText}>잘 먹겠습니다!!</Text>
          </View>

          {animationMatch()}
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={feedlistModalVisible}
        onRequestClose={() => {
          setfeedlistModalVisible(!feedlistModalVisible);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.feedhaveContainer}>
            <Text
              style={[
                styles.ModalText,
                { fontFamily: 'OneMobileBold', marginTop: 5 },
              ]}
            >
              필요한 먹이 리스트
            </Text>

            {feedanimalmatch()}
            {(nofeedstate1 = false)}
            <View style={[styles.feedhavestateContainer, { marginBottom: 0 }]}>
              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  usefeed();
                  if (nofeedstate1) {
                    setnofeedModalVisible(!nofeedModalVisible);
                    setfeedlistModalVisible(!feedlistModalVisible);
                  } else {
                    //비교
                    if (questanimalname === pressedAnimalName) {
                      //퀘스트 완료
                      setquestcheck(true);
                    }
                    setthanksModalVisible(true);
                    setTimeout(() => setthanksModalVisible(false), 5000);
                  }
                  //nofeedstate값을 바꾸고자함
                }}
              >
                <Text style={styles.visitButtonText}>예</Text>
              </Pressable>

              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  setfeedlistModalVisible(!feedlistModalVisible);
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
          <View>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#ffeee3', '#ffe2cb', '#ffd2a8']}
              style={styles.visitDetailModal}
            >
              <View style={styles.visitDetailAnimalNameTextContainer}>
                <Text style={styles.visitDetailAnimalNameText}>
                  {pressedAnimalName}
                </Text>
              </View>
              <View style={styles.detailPhotoContainer}>
                <FastImage
                  source={{
                    uri: `${Config.API_URL}/book/${pressedAnimalPhoto}`,
                  }}
                  resizeMode="contain"
                  style={styles.detailPhoto}
                />
              </View>
              <View style={styles.feedButtonContainer}>
                <Pressable
                  onPress={() => {
                    setfeedlistModalVisible(true);

                    // 먹이 보유 리스트 보여주기
                    // 먹이선택시 동물이랑 비교-> 먹을 수 있는지 -> 성공/ 실패 -> 성공시 애니메이션, 실패시 동물이 못먹는 먹이
                    // 퀘스트 부분 성공
                  }}
                >
                  <LinearGradient
                    colors={['#ff9c5b', '#ff9239', '#ec7200']}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>먹이주기</Text>
                  </LinearGradient>
                </Pressable>
              </View>
              <View style={styles.closeButtonContainer}>
                <Pressable onPress={() => setDetailModalVisible(false)}>
                  <LinearGradient
                    colors={['#5f5f5f', '#4d4d4d', '#383838']}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>닫기</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Quest;

const styles = StyleSheet.create({
  feedText: {
    fontSize: 15,
    fontFamily: 'OneMobileBold',
    textAlign: 'center',
    marginTop: 20,
  },
  visitDetailModal: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#ffecdf',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  detailPhotoContainer: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailPhoto: {
    height: 220,
    width: 220,
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
    margin: 5,
    borderRadius: 7,
  },
  photoContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    backgroundColor: '#fdecd6',
    borderRadius: 6,
    borderColor: '#d66800',
    elevation: 5,
  },
  animationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  animalNameText: {
    fontFamily: 'Cafe24Shiningstar',
    fontSize: 25,
    textAlign: 'center',
    color: '#000',
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedhaveContainer: {
    width: 250,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalbuttonContainer: {
    padding: 5,
    margin: 15,
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#ff8800',
    borderRadius: 10,
    elevation: 5,
  },
  feedhavestateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  ModalText: {
    fontSize: 20,
    fontFamily: 'OneMobileRegluar',
    color: 'black',
    marginBottom: 10,
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
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  QuestContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 6,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  QuestTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  QuestImageContainer: { alignItems: 'center' },
  Questiondivide: { flex: 1 },
  QuestbuttonContainer: {
    padding: 3,
    marginHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#F27E00',
    borderRadius: 10,
  },
});
