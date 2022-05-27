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
  ImageBackground,
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
import BuyFail from '../animations/BuyFail';
import Hearts from '../animations/Hearts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestSuccess from '../animations/QuestSuccess';
import QuestConfetti from '../animations/QuestConfetti';

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
  const [questanimalname, setquestanimalname] = useState('닭');
  const otherDogamPhoto = useSelector(
    (state: RootState) => state.photo.otherPhotos,
  );

  let questChecker = false;

  const userName = useSelector((state: RootState) => state.user.nickname);

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
    getanimalname();
    // getcheckquest();
  }, []);

  //마구 바꾸면 안됨. 처음, 완료시

  const getanimalname = async () => {
    await AsyncStorage.getItem(userName + '퀘스트동물', (err, result) => {
      if (result != null) {
        setquestanimalname(result);
      }
    });
  };

  const changequestanimalname = async () => {
    const rand_0_10 = Math.floor(Math.random() * 11);
    setquestanimalname(questanimallist[rand_0_10]);
    AsyncStorage.setItem(
      userName + '퀘스트동물',
      questanimallist[rand_0_10],
      () => {
        console.log('퀘스트 완료시 셋팅');
      },
    );
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getFriendDogam() {
      const response = await axios.get(`${Config.API_URL}/book/list/rand`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

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

  const closeAllModal = useCallback(() => {
    setfeedlistModalVisible(false);
    setDetailModalVisible(false);
  }, []);

  const afterFeeding = () => {
    setthanksModalVisible(false);
    closeAllModal();
    if (questChecker === true) {
      pluscoinandscore();
      plusquestachive();
      setyesQuestModalVisible(true);
      changequestanimalname();
      questChecker = false;
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
                source={require('../../images/grass.png')}
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
                source={require('../../images/grass.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/fruit.png')}
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
                source={require('../../images/grass.png')}
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
                source={require('../../images/fish.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/beef.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/fruit.png')}
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
                source={require('../../images/fish.png')}
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
                source={require('../../images/beef.png')}
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
                source={require('../../images/beef.png')}
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
                source={require('../../images/worm.png')}
                style={{ height: 60 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1 }}>
              <FastImage
                source={require('../../images/fruit.png')}
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
                source={require('../../images/worm.png')}
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
                source={require('../../images/dogFood.png')}
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
  const animationMatch = useCallback(() => {
    if (pressedAnimalName === '닭') {
      return (
        <View>
          <Chicken style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '기린') {
      return (
        <View>
          <Girafe style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '사슴') {
      return (
        <View>
          <Deer style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '코끼리') {
      return (
        <View>
          <Elephant style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '여우') {
      return (
        <View>
          <Fox style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '수달') {
      return (
        <View>
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '고양이') {
      return (
        <View>
          <Cat style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '호랑이') {
      return (
        <View>
          <Tiger style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '비둘기') {
      return (
        <View>
          <Pigeon style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '거북') {
      return (
        <View>
          <Turtle style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '시바견') {
      return (
        <View>
          <Dog style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
  }, [pressedAnimalName]);

  let pluscoinandscore = async () => {
    await axios.get(`${Config.API_URL}/addscore30`);
    await axios.get(`${Config.API_URL}/addcoin30`);
  };

  let plusquestachive = async () => {
    await axios.get(`${Config.API_URL}/putachieve`);
  };

  return (
    <View>
      <ImageBackground
        source={require('../../images/board.jpg')}
        resizeMode="stretch"
        style={styles.background}
      >
        <View style={styles.QuestContainer}>
          <View style={styles.Questiondivide}>
            <View style={styles.QuestTextContainer}>
              <Text
                style={{
                  fontFamily: 'Cafe24Shiningstar',
                  fontSize: 30,
                  color: 'black',
                }}
              >
                {questanimalname}에게 먹이주기
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'OneMobileRegular',
                fontSize: 13,
                marginTop: 10,
              }}
            >
              * 다른 친구의 도감에 방문하여 퀘스트를 수행하세요!
            </Text>
            <Text
              style={{
                fontFamily: 'OneMobileRegular',
                fontSize: 13,
                marginTop: 5,
              }}
            >
              * 완료 시, 30코인 + 30점 지급
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Pressable onPress={() => handleVisit()}>
            <LinearGradient
              colors={['#ff9c5b', '#fc640d', '#e64900']}
              style={styles.visitButton}
            >
              <Text style={styles.visitButtonText}>
                다른 친구의 도감에 방문하기
              </Text>
            </LinearGradient>
          </Pressable>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={yesQuestModalVisible}
          onRequestClose={() => {
            setyesQuestModalVisible(false);
          }}
        >
          <View style={styles.encycloContainer}>
            <QuestConfetti style={styles.animationStyle} />
            <View style={[styles.buyresultContainer, { width: '100%' }]}>
              <View style={styles.buyresultTextContainer}>
                <Text
                  style={[
                    styles.ModalText,
                    {
                      fontFamily: 'Cafe24Shiningstar',
                      fontSize: 28,
                      marginTop: 10,
                    },
                  ]}
                >
                  퀘스트 완료!
                </Text>
                <QuestSuccess style={styles.animationStyle} />
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontFamily: 'OneMobileRegular',
                  marginTop: 5,
                }}
              >
                30코인과 30점이 지급되었습니다.
              </Text>
              <View style={{ alignItems: 'center' }}>
                <Pressable
                  style={[
                    styles.ModalbuttonContainer,
                    { padding: 8, width: '30%' },
                  ]}
                  onPress={() => {
                    setyesQuestModalVisible(false);
                  }}
                >
                  <Text style={styles.visitButtonText}>확인</Text>
                </Pressable>
              </View>
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
          animationType="fade"
          transparent={true}
          visible={nofeedModalVisible}
          onRequestClose={() => {
            setnofeedModalVisible(!nofeedModalVisible);
          }}
        >
          <View style={styles.encycloContainer}>
            <View style={styles.buyresultContainer}>
              <View style={styles.buyresultTextContainer}>
                <BuyFail style={styles.animationStyle} />
                <Text
                  style={[
                    styles.bigtext,
                    {
                      fontSize: 18,
                      padding: 3,
                      marginBottom: 0,
                      color: '#e45b00',
                    },
                  ]}
                >
                  먹이가 부족해요!
                </Text>
                <Text style={{ fontSize: 14, fontFamily: 'OneMobileRegular' }}>
                  상점에서 먹이를 구매하세요.
                </Text>
              </View>
              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  setnofeedModalVisible(!nofeedModalVisible);
                  setDetailModalVisible(!detailModalVisible);
                }}
              >
                <Text style={styles.visitButtonText}>확인</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={thanksModalVisible}
          onRequestClose={() => {
            setthanksModalVisible(!thanksModalVisible);
          }}
        >
          <View style={styles.animalAnimationModalBG}>
            {animationMatch()}
            <Text style={styles.animalThanksText}>
              "{userName}님, 고마워요. 잘 먹을게요!"
            </Text>
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
              <View
                style={[styles.feedhavestateContainer, { marginBottom: 0 }]}
              >
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
                        questChecker = true;
                      }
                      setthanksModalVisible(true);
                      setTimeout(() => afterFeeding(), 3000);
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
                <Text style={styles.visitLoadingText}>
                  잠시만 기다려주세요.
                </Text>
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
      </ImageBackground>
    </View>
  );
}

export default Quest;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  heartAnimationStyle: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    left: Dimensions.get('window').width / 4,
  },
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
    color: 'black',
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
    elevation: 5,
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
    width: '100%',
    height: '100%',
    flex: 1,
  },
  animalAnimationStyle: {
    height: '90%',
    width: '90%',
    left: Dimensions.get('window').width / 20,
    bottom: Dimensions.get('window').height / 40,
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
  animalAnimationModalBG: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
  animalThanksText: {
    fontSize: 30,
    fontFamily: 'Cafe24Shiningstar',
    color: 'white',
    marginBottom: 20,
  },
  buyresultContainer: {
    width: 250,
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
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
    borderBottomRightRadius: 15,
    padding: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#fff7bb',
    marginVertical: 20,
    paddingHorizontal: 20,
    elevation: 10,
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
  bigtext: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OneMobileBold',
    padding: 5,
  },
});
