/* eslint-disable dot-notation */
/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios from 'axios';
import { Card, WingBlank } from '@ant-design/react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AchiveProps = {
  no: number;
  animalName: string;
};

function Achievement() {
  const [animals, setanimals] = useState([]);
  const [animalsnum, setanimalsnum] = useState(0);
  const [achiv1, setachiv1] = useState(0);
  const [achiv2, setachiv2] = useState(0);
  const [achiv3, setachiv3] = useState(0);
  const [achiv4, setachiv4] = useState(0);
  const [achiv5, setachiv5] = useState(0);
  const [achiv6, setachiv6] = useState(0);
  const [achiv7, setachiv7] = useState(0);

  const nickname = useSelector((state: RootState) => state.user.nickname);

  let pluscoin10andscore20 = async () => {
    await axios.get(`${Config.API_URL}/addcoin10`);
    await axios.get(`${Config.API_URL}/addscore20`);
  };
  let pluscoin25andscore40 = async () => {
    await axios.get(`${Config.API_URL}/addcoin25`);
    await axios.get(`${Config.API_URL}/addscore40`);
  };
  let pluscoin40andscore70 = async () => {
    await axios.get(`${Config.API_URL}/addcoin40`);
    await axios.get(`${Config.API_URL}/addscore70`);
  };
  let pluscoin50andscore90 = async () => {
    await axios.get(`${Config.API_URL}/addcoin50`);
    await axios.get(`${Config.API_URL}/addscore90`);
  };

  useEffect(() => {
    //정보 불러와서 비교

    async function getinformation() {
      let achive1 = 0;
      let achive2 = 0;
      let achive3 = 0;
      let achive4 = 0;
      let achive5 = 0;
      let achive6 = 0;
      let achive7 = 0;

      let animalnum = 0;
      let achievenum = 0;
      await axios.get(`${Config.API_URL}/getachieve`).then((response) => {
        achievenum = response.data;
      });

      await axios.get(`${Config.API_URL}/book/list/has`).then((response) => {
        animalnum = response.data.length;
        setanimals(response.data);
        setanimalsnum(response.data.length);
        AsyncStorage.setItem('animalnum', String(animalnum), () => {});
      });
      //업적 1 달성여부

      await AsyncStorage.getItem('animalnum', (err, result) => {});

      await AsyncStorage.getItem(nickname + '업적1', (err, result) => {
        if (result === '1') {
          achive1 = 1; //to check
          setachiv1(achive1);
        }
      });
      await AsyncStorage.getItem(nickname + '업적2', (err, result) => {
        if (result === '1') {
          achive2 = 1; //to check
          setachiv2(achive2);
        }
      });
      await AsyncStorage.getItem(nickname + '업적3', (err, result) => {
        if (result === '1') {
          achive3 = 1; //to check
          setachiv3(achive3);
        }
      });
      await AsyncStorage.getItem(nickname + '업적4', (err, result) => {
        if (result === '1') {
          achive4 = 1; //to check
          setachiv4(achive4);
        }
      });
      await AsyncStorage.getItem(nickname + '업적5', (err, result) => {
        if (result === '1') {
          achive5 = 1; //to check
          setachiv5(achive5);
        }
      });
      await AsyncStorage.getItem(nickname + '업적6', (err, result) => {
        if (result === '1') {
          achive6 = 1; //to check
          setachiv6(achive6);
        }
      });
      await AsyncStorage.getItem(nickname + '업적7', (err, result) => {
        if (result === '1') {
          achive7 = 1; //to check
          setachiv7(achive7);
        }
      });

      if (animalnum >= 5 && achive1 === 0) {
        AsyncStorage.setItem(nickname + '업적1', '1', () => {});
        //보상
        pluscoin10andscore20();
      }
      if (animalnum >= 10 && achive2 === 0) {
        AsyncStorage.setItem(nickname + '업적2', '1', () => {});
        //보상
        pluscoin10andscore20();
      }
      if (achievenum >= 10 && achive3 === 0) {
        AsyncStorage.setItem(nickname + '업적3', '1', () => {});
        //보상
        pluscoin25andscore40();
      }

      //cuteanimal... achivement4
      let cuteanimal = 0;
      animals.map((name) =>
        name['animalName'] === '고양이' ? (cuteanimal = cuteanimal + 1) : name,
      );
      animals.map((name) =>
        name['animalName'] === '시바견' ? (cuteanimal = cuteanimal + 1) : name,
      );
      animals.map((name) =>
        name['animalName'] === '토끼' ? (cuteanimal = cuteanimal + 1) : name,
      );

      if (cuteanimal >= 3 && achive4 === 0) {
        AsyncStorage.setItem(nickname + '업적4', '1', () => {});
        //보상
        pluscoin25andscore40();
      }

      //biganimal... achivement5
      let biganimal = 0;
      animals.map((name) =>
        name['animalName'] === '기린' ? (biganimal = biganimal + 1) : name,
      );
      animals.map((name) =>
        name['animalName'] === '코끼리' ? (biganimal = biganimal + 1) : name,
      );
      animals.map((name) =>
        name['animalName'] === '곰' ? (biganimal = biganimal + 1) : name,
      );

      if (biganimal >= 3 && achive5 === 0) {
        AsyncStorage.setItem(nickname + '업적5', '1', () => {});
        //보상
        pluscoin25andscore40();
      }

      //smallanimal... achivement6
      let smallanimal = 0;
      animals.map((name) =>
        name['animalName'] === '쥐' ? (smallanimal = smallanimal + 1) : name,
      );
      animals.map((name) =>
        name['animalName'] === '참새' ? (smallanimal = smallanimal + 1) : name,
      );
      animals.map((name) =>
        name['animalName'] === '다람쥐'
          ? (smallanimal = smallanimal + 1)
          : name,
      );
      animals.map((name) =>
        name['animalName'] === '미어캣'
          ? (smallanimal = smallanimal + 1)
          : name,
      );

      if (smallanimal >= 4 && achive6 === 0) {
        AsyncStorage.setItem(nickname + '업적6', '1', () => {});
        //보상
        pluscoin40andscore70();
      }
      if (achievenum >= 20 && achive7 === 0) {
        AsyncStorage.setItem(nickname + '업적7', '1', () => {});
        //보상
        pluscoin50andscore90();
      }
    }
    getinformation();
  }, [animalsnum]);

  return (
    <ScrollView style={{ backgroundColor: '#ffe3c8' }}>
      <View style={{ height: 10 }} />
      <WingBlank size="lg">
        <Card style={{ elevation: 10 }}>
          <Card.Header
            title="동물 수집가 Lv.1 (5종)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={
              achiv1 === 1
                ? 'https://ifh.cc/g/FDVkny.png'
                : 'https://ifh.cc/g/JKHCsn.png'
            }
            extra=""
          />
          <Card.Body>
            <View style={{ height: 30 }}>
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                  fontFamily: 'OneMobileRegular',
                }}
              >
                서로 다른 동물 5종을 모아보세요.
              </Text>
            </View>
          </Card.Body>
          <Card.Footer content="" extra="보상: 10 코인, 20 EXP" />
        </Card>
      </WingBlank>
      <View style={{ height: 10 }} />
      <WingBlank size="lg">
        <Card style={{ elevation: 10 }}>
          <Card.Header
            title="동물 수집가 Lv.2 (10종)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={
              achiv2 === 1
                ? 'https://ifh.cc/g/FDVkny.png'
                : 'https://ifh.cc/g/JKHCsn.png'
            }
            extra=""
          />
          <Card.Body>
            <View style={{ height: 30 }}>
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                  fontFamily: 'OneMobileRegular',
                }}
              >
                서로 다른 동물 10종을 모아보세요.
              </Text>
            </View>
          </Card.Body>
          <Card.Footer content="" extra="보상: 25 코인, 40 EXP" />
        </Card>
      </WingBlank>
      <View style={{ height: 10 }} />
      <WingBlank size="lg">
        <Card style={{ elevation: 10 }}>
          <Card.Header
            title="퀘스트 마스터 Lv.1 (10회)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={
              achiv3 === 1
                ? 'https://ifh.cc/g/h0ShwY.png'
                : 'https://ifh.cc/g/JKHCsn.png'
            }
            extra=""
          />
          <Card.Body>
            <View style={{ height: 30 }}>
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                  fontFamily: 'OneMobileRegular',
                }}
              >
                퀘스트를 10회 수행하세요.
              </Text>
            </View>
          </Card.Body>
          <Card.Footer content="" extra="보상: 25 코인, 40 EXP" />
        </Card>
      </WingBlank>
      <View style={{ height: 10 }} />
      <WingBlank size="lg">
        <Card style={{ elevation: 10 }}>
          <Card.Header
            title="퀘스트 마스터 Lv.2 (20회)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={
              achiv7 === 1
                ? 'https://ifh.cc/g/h0ShwY.png'
                : 'https://ifh.cc/g/JKHCsn.png'
            }
            extra=""
          />
          <Card.Body>
            <View style={{ height: 30 }}>
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                  fontFamily: 'OneMobileRegular',
                }}
              >
                퀘스트를 20회 수행하세요.
              </Text>
            </View>
          </Card.Body>
          <Card.Footer content="" extra="보상: 50 코인, 90 EXP" />
        </Card>
      </WingBlank>
      <View style={{ height: 10 }} />
      <WingBlank size="lg">
        <Card style={{ elevation: 10 }}>
          <Card.Header
            title="귀여운 동물 모으기"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={
              achiv4 === 1
                ? 'https://ifh.cc/g/7Oc0MX.jpg'
                : 'https://ifh.cc/g/JKHCsn.png'
            }
            extra=""
          />
          <Card.Body>
            <View style={{ height: 30 }}>
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                  fontFamily: 'OneMobileRegular',
                }}
              >
                고양이 토끼 시바견을 모아보세요.
              </Text>
            </View>
          </Card.Body>
          <Card.Footer content="" extra="보상: 25 코인, 40 EXP" />
        </Card>
      </WingBlank>
      <View style={{ height: 10 }} />
      <WingBlank size="lg">
        <Card style={{ elevation: 10 }}>
          <Card.Header
            title="큰 동물 모으기"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={
              achiv5 === 1
                ? 'https://ifh.cc/g/G4z5x9.png'
                : 'https://ifh.cc/g/JKHCsn.png'
            }
            extra=""
          />
          <Card.Body>
            <View style={{ height: 30 }}>
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                  fontFamily: 'OneMobileRegular',
                }}
              >
                코끼리 기린 곰을 모아보세요.
              </Text>
            </View>
          </Card.Body>
          <Card.Footer content="" extra="보상: 25 코인, 40 EXP" />
        </Card>
      </WingBlank>
      <View style={{ height: 10 }} />
      <WingBlank size="lg">
        <Card style={{ elevation: 10 }}>
          <Card.Header
            title="작은 동물 모으기"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={
              achiv6 === 1
                ? 'https://ifh.cc/g/ds8Gbh.png'
                : 'https://ifh.cc/g/JKHCsn.png'
            }
            extra=""
          />
          <Card.Body>
            <View style={{ height: 30 }}>
              <Text
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                  fontFamily: 'OneMobileRegular',
                }}
              >
                쥐 참새 다람쥐 미어캣을 모아보세요.
              </Text>
            </View>
          </Card.Body>
          <Card.Footer content="" extra="보상: 40 코인, 70 EXP" />
        </Card>
      </WingBlank>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  buttonImageContainer: { flex: 1 },
  buttonTextContainer: {
    flex: 8,
    flexDirection: 'column',
  },

  AchivementContainer: {
    flexDirection: 'row',
    flex: 1,
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

  MainText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'OneMobileBold',
  },

  SubText: { fontFamily: 'OneMobileRegular', paddingTop: 3 },
});

export default Achievement;
