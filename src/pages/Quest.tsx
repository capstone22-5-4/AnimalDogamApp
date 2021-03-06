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
  const [questanimalname, setquestanimalname] = useState('???');
  const otherDogamPhoto = useSelector(
    (state: RootState) => state.photo.otherPhotos,
  );

  let questChecker = false;

  const userName = useSelector((state: RootState) => state.user.nickname);

  //????????? ?????? ?????? ??????
  const questanimallist = [
    '???',
    '??????',
    '??????',
    '?????????',
    '??????',
    '??????',
    '?????????',
    '?????????',
    '?????????',
    '??????',
    '?????????',
  ];
  useEffect(() => {
    getanimalname();
    // getcheckquest();
  }, []);

  //?????? ????????? ??????. ??????, ?????????

  const getanimalname = async () => {
    await AsyncStorage.getItem(userName + '???????????????', (err, result) => {
      if (result != null) {
        setquestanimalname(result);
      }
    });
  };

  const changequestanimalname = async () => {
    const rand_0_10 = Math.floor(Math.random() * 11);
    setquestanimalname(questanimallist[rand_0_10]);
    AsyncStorage.setItem(
      userName + '???????????????',
      questanimallist[rand_0_10],
      () => {
        console.log('????????? ????????? ??????');
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
  7?????? ??????
  ??? - ?????? ??? ?????? ?????????
  ????????? - ??????, ??????
  ????????? - ?????????, ?????????, ??????
  ????????? - ?????????, ?????????
  ?????? - ?????????
  ?????? - ????????? ????????? ??????
  */

  let ????????? = useSelector((state: RootState) => state.food.?????????);
  let ??? = useSelector((state: RootState) => state.food.???);
  let ????????? = useSelector((state: RootState) => state.food.?????????);
  let ????????? = useSelector((state: RootState) => state.food.?????????);
  let ?????? = useSelector((state: RootState) => state.food.??????);
  let ?????? = useSelector((state: RootState) => state.food.??????);

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
    { id: 0, num: ????????? },
    { id: 1, num: ??? },
    { id: 2, num: ????????? },
    { id: 3, num: ????????? },
    { id: 4, num: ?????? },
    { id: 5, num: ?????? },
  ]);

  useEffect(() => {
    feeditems[0].num = ?????????;
    feeditems[1].num = ???;
    feeditems[2].num = ?????????;
    feeditems[3].num = ?????????;
    feeditems[4].num = ??????;
    feeditems[5].num = ??????;
  }, [?????????, ???, ?????????, ?????????, ??????, ??????]);

  // ???????????? ???????????? ?????? ???????????? redux??? ????????????
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
  }, [dispatch, feeditems, ?????????, ???, ?????????, ?????????, ??????, ??????]);

  async function waitusefeed() {
    await usefeed();
  }

  let usefeed = async () => {
    if (pressedAnimalName === '???') {
      if (feeditems[1].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use???`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '??????') {
      if (feeditems[1].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use???`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '??????') {
      if (feeditems[1].num >= 1 && feeditems[5].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use???`);
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use??????`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '?????????') {
      if (feeditems[1].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 1
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use???`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName == '??????') {
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
          await axios.get(`${Config.API_URL}/use?????????`);
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use?????????`);
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use??????`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '??????') {
      if (feeditems[0].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 0
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use?????????`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '?????????') {
      if (feeditems[2].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use?????????`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '?????????') {
      if (feeditems[2].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 2
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use?????????`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '?????????') {
      if (feeditems[3].num >= 1 && feeditems[5].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 3
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use?????????`);
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 5
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use??????`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '??????') {
      if (feeditems[3].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 3
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use?????????`);
      } else {
        nofeedstate1 = true;
      }
    } else if (pressedAnimalName === '?????????') {
      if (feeditems[4].num >= 1) {
        setfeeditems(
          feeditems.map((feeditems) =>
            feeditems.id === 4
              ? { ...feeditems, num: feeditems.num - 1 }
              : feeditems,
          ),
        ),
          await axios.get(`${Config.API_URL}/use??????`);
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
    if (pressedAnimalName === '???') {
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
          <Text style={styles.feedText}>'???'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
      return <Text style={styles.feedText}>'???'</Text>;
    }
    if (pressedAnimalName === '??????') {
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
          <Text style={styles.feedText}>'???', '??????'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
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
          <Text style={styles.feedText}>'???'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
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
          <Text style={styles.feedText}>'?????????', '?????????', '??????'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
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
          <Text style={styles.feedText}>'?????????'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
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
          <Text style={styles.feedText}>'?????????'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
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
          <Text style={styles.feedText}>'?????????'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
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
          <Text style={styles.feedText}>'?????????', '??????'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
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
          <Text style={styles.feedText}>'?????????'</Text>
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
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
          <Text style={styles.feedText}>'??????'</Text>
        </View>
      );
    }
  };

  //working
  const animationMatch = useCallback(() => {
    if (pressedAnimalName === '???') {
      return (
        <View>
          <Chicken style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
      return (
        <View>
          <Girafe style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
      return (
        <View>
          <Deer style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
      return (
        <View>
          <Elephant style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
      return (
        <View>
          <Fox style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
      return (
        <View>
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
      return (
        <View>
          <Cat style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
      return (
        <View>
          <Tiger style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
      return (
        <View>
          <Pigeon style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '??????') {
      return (
        <View>
          <Turtle style={styles.animalAnimationStyle} />
          <Hearts style={styles.heartAnimationStyle} />
        </View>
      );
    }
    if (pressedAnimalName === '?????????') {
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
                {questanimalname}?????? ????????????
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'OneMobileRegular',
                fontSize: 13,
                marginTop: 10,
              }}
            >
              * ?????? ????????? ????????? ???????????? ???????????? ???????????????!
            </Text>
            <Text
              style={{
                fontFamily: 'OneMobileRegular',
                fontSize: 13,
                marginTop: 5,
              }}
            >
              * ?????? ???, 30?????? + 30??? ??????
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.QuestContainer,
            { backgroundColor: '#faedfc', marginTop: 0 },
          ]}
        >
          <View style={styles.Questiondivide}>
            <View style={styles.QuestTextContainer}>
              <Text
                style={{
                  fontFamily: 'Cafe24Shiningstar',
                  fontSize: 30,
                  color: '#000',
                }}
              >
                ????????? ???????????? ??????????????????...
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Cafe24Shiningstar',
                fontSize: 13,
                marginTop: 10,
              }}
            ></Text>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Pressable onPress={() => handleVisit()}>
            <LinearGradient
              colors={['#ff9c5b', '#fc640d', '#e64900']}
              style={styles.visitButton}
            >
              <Text style={styles.visitButtonText}>
                ?????? ????????? ????????? ????????????
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
                  ????????? ??????!
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
                30????????? 30?????? ?????????????????????.
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
                  <Text style={styles.visitButtonText}>??????</Text>
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
                <Text style={styles.ModalText}>???????????? ??????????????????!</Text>
              </View>
              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  setQuestModalVisible(!QuestModalVisible);
                }}
              >
                <Text style={styles.visitButtonText}>??????</Text>
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
                  ????????? ????????????!
                </Text>
                <Text style={{ fontSize: 14, fontFamily: 'OneMobileRegular' }}>
                  ???????????? ????????? ???????????????.
                </Text>
              </View>
              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  setnofeedModalVisible(!nofeedModalVisible);
                  setDetailModalVisible(!detailModalVisible);
                }}
              >
                <Text style={styles.visitButtonText}>??????</Text>
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
              "{userName}???, ????????????. ??? ????????????!"
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
                ????????? ?????? ?????????
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
                      //??????
                      if (questanimalname === pressedAnimalName) {
                        //????????? ??????
                        questChecker = true;
                      }
                      setthanksModalVisible(true);
                      setTimeout(() => afterFeeding(), 3000);
                    }
                    //nofeedstate?????? ???????????????
                  }}
                >
                  <Text style={styles.visitButtonText}>???</Text>
                </Pressable>

                <Pressable
                  style={[styles.ModalbuttonContainer]}
                  onPress={() => {
                    setfeedlistModalVisible(!feedlistModalVisible);
                  }}
                >
                  <Text style={styles.visitButtonText}>?????????</Text>
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
                {dogamOwnerName} ?????? ??????
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
                <Text style={styles.closeButtonText}>??????</Text>
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
                  ????????? ??????????????????.
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

                      // ?????? ?????? ????????? ????????????
                      // ??????????????? ???????????? ??????-> ?????? ??? ????????? -> ??????/ ?????? -> ????????? ???????????????, ????????? ????????? ????????? ??????
                      // ????????? ?????? ??????
                    }}
                  >
                    <LinearGradient
                      colors={['#ff9c5b', '#ff9239', '#ec7200']}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>????????????</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
                <View style={styles.closeButtonContainer}>
                  <Pressable onPress={() => setDetailModalVisible(false)}>
                    <LinearGradient
                      colors={['#5f5f5f', '#4d4d4d', '#383838']}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>??????</Text>
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
