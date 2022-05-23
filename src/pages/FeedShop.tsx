import React, { useState, useEffect, useCallback } from 'react';
import { Pressable, Image, Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, Alert } from 'react-native';
import { RootState } from '../store/reducer';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import { useAppDispatch } from '../store';
import foodSlice from '../slices/food';
import coinSlice from '../slices/user';
import { useSelector } from 'react-redux';
import Shop from '../animations/Shop';
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'
/* 
강아지 사료
거북이 밀웜
고양이 닭고기
기린 미모사(풀)
닭 알곡(잡곡), 풀
비둘기 알곡, 과일
사슴 풀
여우 잡식성 - 작은동물들, 과일 물고기
코끼리 풀 과일
판다 대나무
펭귄 물고기, 크릴새우
호랑이 사슴, 토끼, ... 동물들

7가지 판매
풀 - 기린 닭 사슴 코끼리
물고기 - 여우, 수달
소고기 - 고양이, 호랑이, 여우
지렁이 - 비둘기, 거북이
사료 - 강아지
과일 - 코끼리 비둘기 여우
*/

function FeedShop() {
  let 물고기 = useSelector((state: RootState) => state.food.물고기);
  let 풀 = useSelector((state: RootState) => state.food.풀);
  let 소고기 = useSelector((state: RootState) => state.food.소고기);
  let 지렁이 = useSelector((state: RootState) => state.food.지렁이);
  let 사료 = useSelector((state: RootState) => state.food.사료);
  let 과일 = useSelector((state: RootState) => state.food.과일);

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

  const credits = useSelector((state: RootState) => state.user.credit); // 코인
  // 예시입니다. 소고기라는 변수에 소고기 보유 수량이 담기게 됩니다.

  //서버에 0값이 저장되어있다면 필요가없음
  /*if (물고기==NaN){
    물고기=0
  }
  if (풀==NaN){
    풀=0
  }
  if (소고기==NaN){
    소고기=0
  }
  if (지렁이==NaN){
    지렁이=0
  }
  if (사료==NaN){
    사료=0
  }
  if (과일==NaN){
    과일=0
  }*/

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [feedname, setfeedname] = useState('');
  const [coin, setcoin] = useState(credits); //credits로 변경
  const [feedpicture, setfeedpicture] = useState(1);
  const [feedcoin, setfeedcoin] = useState(1);
  //초기값은 서버에서 받아오거나 앱 내의 값으로 설정해준다.

  const dispatch = useAppDispatch();
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
  }, [dispatch, coin, feeditems, 물고기, 풀, 소고기, 지렁이, 사료, 과일]);

  //서버에 먹이 추가
  let postfeeditemdata = async () => {
    const data = { food_name: feedname, cost: feedcoin };
    const qs = require('qs');
    await axios.post(`${Config.API_URL}/buyfood`, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };

  const array = [
    {
      id: 0,
      src: require('../../images/물고기.png'),
    },
    {
      id: 1,
      src: require('../../images/풀.png'),
    },
    {
      id: 2,
      src: require('../../images/소고기.png'),
    },
    {
      id: 3,
      src: require('../../images/지렁이.png'),
    },
    {
      id: 4,
      src: require('../../images/사료.png'),
    },
    {
      id: 5,
      src: require('../../images/과일.png'),
    },

    //추가 먹이있으면 array 에 정렬
    //구매버튼 클릭시 array에서 필요한 먹이를 setfeddpicture로 전달
  ];

  //서버에 데이터를 전송하는 부분은 먹이 -> 예를 눌렀을 경우
  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.foodModalContainer}>
            <Text style={styles.bigtext}>나의 보유 먹이</Text>
            <View style={styles.feedhavetextContainer}>
              <View style={styles.FeedTextContainer4}>
                <Text style={styles.statetext}>물고기</Text>
                <Text style={styles.statetext}>풀</Text>
                <Text style={styles.statetext}>소고기</Text>
                <Text style={styles.statetext}>지렁이</Text>
                <Text style={styles.statetext}>사료</Text>
                <Text style={styles.statetext}>과일</Text>
              </View>
              <View style={styles.FeedTextContainer4}>
                <Text style={styles.statetext}>{feeditems[0].num}개</Text>
                <Text style={styles.statetext}>{feeditems[1].num}개</Text>
                <Text style={styles.statetext}>{feeditems[2].num}개</Text>
                <Text style={styles.statetext}>{feeditems[3].num}개</Text>
                <Text style={styles.statetext}>{feeditems[4].num}개</Text>
                <Text style={styles.statetext}>{feeditems[5].num}개</Text>
              </View>
            </View>
            <Pressable
              style={[styles.ModalbuttonContainer]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.statetext}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.buyfeedContainer}>
            <Text style={styles.bigtext}>구매하기</Text>
            <View style={styles.imageContainer}>
              <Image
                source={array[feedpicture].src}
                style={styles.FeedImageonbuybutton}
              />
            </View>

            <Text>"{feedname}"을(를) 구매하시겠습니까?</Text>
            <Text>가격: {feedcoin}코인</Text>
            <Text>현재 보유 코인: {coin}코인</Text>

            <View style={styles.stateContainer2}>
              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                  if (coin >= feedcoin)
                    return (
                      setModalVisible3(true),
                      setcoin(coin - feedcoin),
                      setfeeditems(
                        feeditems.map((feeditems) =>
                          feeditems.id == feedpicture
                            ? { ...feeditems, num: feeditems.num + 1 }
                            : feeditems,
                        ),
                      ),
                      postfeeditemdata()
                    );
                  else if (coin < feedcoin) return setModalVisible4(true);
                }}
              >
                <Text style={styles.statetext}>예</Text>
              </Pressable>

              <Pressable
                style={[styles.ModalbuttonContainer]}
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}
              >
                <Text style={styles.statetext}>아니오</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.buyresultContainer}>
            <View style={styles.buyresultTextContainer}>
              <Text style={styles.bigtext}>"{feedname}"을(를)</Text>
              <Text style={styles.bigtext}>성공적으로 구매하였습니다.</Text>
            </View>
            <Pressable
              style={[styles.ModalbuttonContainer]}
              onPress={() => setModalVisible3(!modalVisible3)}
            >
              <Text style={styles.statetext}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={() => {
          setModalVisible4(!modalVisible4);
        }}
      >
        <View style={styles.encycloContainer}>
          <View style={styles.buyresultContainer}>
            <View style={styles.buyresultTextContainer}>
              <Text style={styles.bigtext}>코인이 부족해요!</Text>
            </View>
            <Pressable
              style={[styles.ModalbuttonContainer]}
              onPress={() => setModalVisible4(!modalVisible4)}
            >
              <Text style={styles.statetext}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ flexDirection: 'row'  }}>
        <View style={{ flex: 4, justifyContent: 'center' }}>
          <Shop style={styles.animationStyle} />
        </View>
        <View style={styles.stateContainer}>
          <View style={styles.smallstateContainer}>
            <Text style={styles.statetext}>보유 코인</Text>
            <Text style={styles.statetext}>{coin}</Text>
            </View>
            <View>
            <Pressable
              style={styles.smallstateContainer2}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.statetext2}>나의 보유 먹이    ></Text>
            </Pressable>

          </View>
        </View>
      </View>

      <View style={styles.FeedContainer}>
        <View style={styles.FeedImageContainer}>
          <Image
            source={require('../../images/물고기.png')}
            style={styles.FeedImage}
          />
          <Text style={styles.MainText} numberOfLines={1}>
            물고기
          </Text>
        </View>
        <View style={styles.FeedTextContainer}>
          <View style={styles.FeedTextContainer2}>
            <Text style={styles.SubText} numberOfLines={1}>
              먹는 동물: 여우 수달
            </Text>
            <Text style={styles.SubText} numberOfLines={1}>
              가격: 10 코인
            </Text>
          </View>
          <View style={styles.FeedTextContainer3}>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                setfeedname('물고기'),
                  setModalVisible2(true),
                  setfeedpicture(0),
                  setfeedcoin(10);
              }}
            >
              <Text style={styles.buttonContainer2}>구매</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.FeedContainer}>
        <View style={styles.FeedImageContainer}>
          <Image
            source={require('../../images/풀.png')}
            style={styles.FeedImage}
          />
          <Text style={styles.MainText} numberOfLines={1}>
            풀
          </Text>
        </View>
        <View style={styles.FeedTextContainer}>
          <View style={styles.FeedTextContainer2}>
            <Text style={styles.SubText} numberOfLines={1}>
              먹는 동물: 기린 닭 사슴 코끼리
            </Text>
            <Text style={styles.SubText} numberOfLines={1}>
              가격: 10 코인
            </Text>
          </View>
          <View style={styles.FeedTextContainer3}>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                setfeedname('풀'),
                  setModalVisible2(true),
                  setfeedpicture(1),
                  setfeedcoin(10);
              }}
            >
              <Text style={styles.buttonContainer2}>구매</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.FeedContainer}>
        <View style={styles.FeedImageContainer}>
          <Image
            source={require('../../images/소고기.png')}
            style={styles.FeedImage}
          />
          <Text style={styles.MainText} numberOfLines={1}>
            소고기
          </Text>
        </View>
        <View style={styles.FeedTextContainer}>
          <View style={styles.FeedTextContainer2}>
            <Text style={styles.SubText} numberOfLines={1}>
              먹는 동물: 고양이 호랑이 여우
            </Text>
            <Text style={styles.SubText} numberOfLines={1}>
              가격: 10 코인
            </Text>
          </View>
          <View style={styles.FeedTextContainer3}>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                setfeedname('소고기'),
                  setModalVisible2(true),
                  setfeedpicture(2),
                  setfeedcoin(10);
              }}
            >
              <Text style={styles.buttonContainer2}>구매</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.FeedContainer}>
        <View style={styles.FeedImageContainer}>
          <Image
            source={require('../../images/지렁이.png')}
            style={styles.FeedImage}
          />
          <Text style={styles.MainText} numberOfLines={1}>
            지렁이
          </Text>
        </View>
        <View style={styles.FeedTextContainer}>
          <View style={styles.FeedTextContainer2}>
            <Text style={styles.SubText} numberOfLines={1}>
              먹는 동물: 비둘기 거북이
            </Text>
            <Text style={styles.SubText} numberOfLines={1}>
              가격: 10 코인
            </Text>
          </View>
          <View style={styles.FeedTextContainer3}>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                setfeedname('지렁이'),
                  setModalVisible2(true),
                  setfeedpicture(3),
                  setfeedcoin(10);
              }}
            >
              <Text style={styles.buttonContainer2}>구매</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.FeedContainer}>
        <View style={styles.FeedImageContainer}>
          <Image
            source={require('../../images/사료.png')}
            style={styles.FeedImage}
          />
          <Text style={styles.MainText} numberOfLines={1}>
            사료
          </Text>
        </View>
        <View style={styles.FeedTextContainer}>
          <View style={styles.FeedTextContainer2}>
            <Text style={styles.SubText} numberOfLines={1}>
              먹는 동물: 강아지
            </Text>
            <Text style={styles.SubText} numberOfLines={1}>
              가격: 10 코인
            </Text>
          </View>
          <View style={styles.FeedTextContainer3}>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                setfeedname('사료'),
                  setModalVisible2(true),
                  setfeedpicture(4),
                  setfeedcoin(10);
              }}
            >
              <Text style={styles.buttonContainer2}>구매</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.FeedContainer}>
        <View style={styles.FeedImageContainer}>
          <Image
            source={require('../../images/과일.png')}
            style={styles.FeedImage}
          />
          <Text style={styles.MainText} numberOfLines={1}>
            과일
          </Text>
        </View>
        <View style={styles.FeedTextContainer}>
          <View style={styles.FeedTextContainer2}>
            <Text style={styles.SubText} numberOfLines={1}>
              먹는 동물: 코끼리 비둘기 여우
            </Text>
            <Text style={styles.SubText} numberOfLines={1}>
              가격: 10 코인
            </Text>
          </View>

          <View style={styles.FeedTextContainer3}>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                setfeedname('과일'),
                  setModalVisible2(true),
                  setfeedpicture(5),
                  setfeedcoin(10);
              }}
            >
              <Text style={styles.buttonContainer2}>구매</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  animationStyle: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  foodModalContainer: {
    backgroundColor: '#FFF7EB',
    alignItems: 'center',
  },
  buyfeedContainer: {
    width: 250,
    height: 350,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buyresultTextContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyresultContainer: {
    width: 250,
    height: 150,
    borderWidth: 1,
    backgroundColor: 'white',
  },

  imageContainer: {
    marginVertical: 10,
    height: 150,
    width: 150,
    borderRadius: 90,
    borderWidth: 1,
    backgroundColor: '#FFF7EB',
  },

  FeedImageonbuybutton: {
    marginVertical: 10,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  bigtext: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OneMobileBold',
    padding: 8,
  },

  feedhavetextContainer: {
    width: 250,
    height: 200,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  encycloContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stateContainer: {
    flex: 5,
    flexDirection: 'column',
    paddingVertical: 10,
  },

  stateContainer2: {
    flexDirection: 'row',
  },

  smallstateContainer: {
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 0,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
  },

  smallstateContainer2: {
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 0,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2A03F',
    elevation: 5,
  },

  statetext: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'OneMobileBold',
    padding: 3,
  },

  statetext2: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'OneMobileBold',
    paddingVertical: 5,
  },

  buttonImage: {
    resizeMode: 'contain',
    width: '150%',
    height: '150%',
    flex: 1,
  },

  FeedImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },

  FeedImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  FeedTextContainer: {
    flex: 3,
    flexDirection: 'column',
  },

  FeedTextContainer2: {
    flex: 1,
    paddingLeft: 20,
  },
  FeedTextContainer3: {
    flex: 1,
    alignItems: 'flex-end',
  },
  FeedTextContainer4: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  buttonContainer: {
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#E3562A',
    elevation: 3,
    paddingHorizontal: 25,
  },
  ModalbuttonContainer: {
    padding: 5,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  buttonContainer2: {
    color: 'white',
    fontSize: 12,
  },

  FeedContainer: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 8,
    padding: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    marginVertical: 5,
    paddingHorizontal: 20,
  },

  MainText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'OneMobileBold',
    padding: 10,
  },

  SubText: { fontFamily: 'OneMobileRegular', paddingTop: 5, color: 'black' },
});

export default FeedShop;
