import React, {  useEffect, useState, useCallback } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios, { AxiosError } from 'axios';
import { Card, WingBlank } from '@ant-design/react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntmModal from '@ant-design/react-native/lib/modal/Modal';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

type AchiveProps = {
  no: number;
  animalName: string;
};

function Achievement() {
  const [check, setcheck] = useState(false);
  //const [animalnum, setanimalnum] = useState(0);
  const [animals, setanimals] = useState([]);
  const [achiv1, setachiv1] = useState(0);
  const [achiv2, setachiv2] = useState(0);
  const [achiv3, setachiv3] = useState(0);
  const [achiv4, setachiv4] = useState(0);
  const [achiv5, setachiv5] = useState(0);
  const [achiv6, setachiv6] = useState(0);
  const [achiv7, setachiv7] = useState(0);
  //const [achive1, setachive1] = useState(0);

  const nickname = useSelector((state: RootState) => state.user.nickname)
  

  let animallist = async () => { 
    const response = await axios.get(`${Config.API_URL}/book/list/has`);
    console.log(response.data)
    console.log(response.data.length)

    return response.data
  };
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
  
  useEffect(()=>{
    //정보 불러와서 비교
    
    async function getinformation(){
      let achive1 = 0;
      let achive2 = 0;
      let achive3 = 0;
      let achive4 = 0;
      let achive5 = 0;
      let achive6 = 0;
      let achive7 = 0;
      
      let animalnum = 0;
      let achievenum = 0;
      await axios.get(`${Config.API_URL}/getachieve`)
      .then ( response =>{
          
        console.log("업적 횟수: ", response.data)
        achievenum = response.data
        
      }
    )
      
      await axios.get(`${Config.API_URL}/book/list/has`)
        .then ( response =>{
          
          console.log(response.data)
          animalnum = response.data.length
          setanimals(response.data);
          AsyncStorage.setItem('animalnum',String(animalnum), () => {
            console.log('AsyncStorage에 저장')
          });
          console.log(response.data.length)
        }
      )
      //업적 1 달성여부
      
      
     await AsyncStorage.getItem('animalnum', (err, result) => {
        console.log("저장된 동물" , result);
      });


      await AsyncStorage.getItem(nickname+'업적1', (err, result) => {
        console.log("업적1:" , result);
        if (result == '1'){
          
          achive1 = 1; //to check
          console.log("업적1 변수 함수 내부:" ,achive1);
          setachiv1(achive1)
        }
      });
      await AsyncStorage.getItem(nickname+'업적2', (err, result) => {
        console.log("업적2:" , result);
        if (result == '1'){
          console.log("업적2 변수 함수 내부:" ,achive2);
          achive2 = 1; //to check
          setachiv2(achive2)
        }
      });
      await AsyncStorage.getItem(nickname+'업적3', (err, result) => {
        console.log("업적3:" , result);
        if (result == '1'){
          console.log("업적3 변수 함수 내부:" ,achive3);
          achive3 = 1; //to check
          setachiv3(achive3)
        }
      });
      await AsyncStorage.getItem(nickname+'업적4', (err, result) => {
        console.log("업적4:" , result);
        if (result == '1'){
          console.log("업적4 변수 함수 내부:" ,achive4);
          achive4 = 1; //to check
          setachiv4(achive4)
        }
      });
      await AsyncStorage.getItem(nickname+'업적5', (err, result) => {
        console.log("업적5:" , result);
        if (result == '1'){
          console.log("업적5 변수 함수 내부:" ,achive5);
          achive5 = 1; //to check
          setachiv5(achive5)
        }
      });
      await AsyncStorage.getItem(nickname+'업적6', (err, result) => {
        console.log("업적6:" , result);
        if (result == '1'){
          console.log("업적6 변수 함수 내부:" ,achive6);
          achive6 = 1; //to check
          setachiv6(achive6)
        }
      });
      await AsyncStorage.getItem(nickname+'업적7', (err, result) => {
        console.log("업적7:" , result);
        if (result == '1'){
          console.log("업적7 변수 함수 내부:" ,achive7);
          achive7 = 1; //to check
          setachiv7(achive7)
        }
      });

      //console.log("업적1 변수: useeffect11111 : " , achive1);
      //console.log("업적1 변수: useeffect22222 : " , achive1);
      if (animalnum >=5 && achive1==0){
        AsyncStorage.setItem(nickname+'업적1', '1', () => {
        console.log('업적 1 1번 완료 후 더이상들어오지않음')
      });
      //보상
      pluscoin10andscore20();
      
      }
      if (animalnum >=10 && achive2==0){
        AsyncStorage.setItem(nickname+'업적2', '1', () => {
        console.log('업적 2 1번 완료 후 더이상들어오지않음')
      });
      //보상
      pluscoin10andscore20();
      
      }
      if (achievenum >=10 && achive3==0){
        AsyncStorage.setItem(nickname+'업적3', '1', () => {
        console.log('업적 3 1번 완료 후 더이상들어오지않음')
      });
      //보상
      pluscoin25andscore40();
      }

      console.log("업적 점수 : ",achievenum)
      //cuteanimal... achivement4
      let cuteanimal = 0
      animals.map((name)=> name['animalName'] =='고양이'
      ? cuteanimal = cuteanimal+1
      :name,
      )
      animals.map((name)=> name['animalName'] =='시바견'
      ? cuteanimal = cuteanimal+1
      :name,
      )
      animals.map((name)=> name['animalName'] =='토끼'
      ? cuteanimal = cuteanimal+1
      :name,
      )

      if (cuteanimal >=3 && achive4==0){
        AsyncStorage.setItem(nickname+'업적4', '1', () => {
        console.log('업적 4 1번 완료 후 더이상들어오지않음')
      });
      //보상
      pluscoin25andscore40();
      }


      //biganimal... achivement5
      let biganimal = 0
      animals.map((name)=> name['animalName'] =='기린'
      ? biganimal = biganimal+1
      :name,
      )
      animals.map((name)=> name['animalName'] =='코끼리'
      ? biganimal = biganimal+1
      :name,
      )
      animals.map((name)=> name['animalName'] =='곰'
      ? biganimal = biganimal+1
      :name,
      )

      if (biganimal >=3 && achive5==0){
        AsyncStorage.setItem(nickname+'업적5', '1', () => {
        console.log('업적 5 1번 완료 후 더이상들어오지않음')
      });
      //보상
      pluscoin25andscore40();
      }

      //smallanimal... achivement6
      let smallanimal = 0
      animals.map((name)=> name['animalName'] =='쥐'
      ? smallanimal = smallanimal+1
      :name,
      )
      animals.map((name)=> name['animalName'] =='참새'
      ? smallanimal = smallanimal+1
      :name,
      )
      animals.map((name)=> name['animalName'] =='다람쥐'
      ? smallanimal = smallanimal+1
      :name,
      )
      animals.map((name)=> name['animalName'] =='미어캣'
      ? smallanimal = smallanimal+1
      :name,
      )

      if (smallanimal >=4 && achive6==0){
        AsyncStorage.setItem(nickname+'업적6', '1', () => {
        console.log('업적 6 1번 완료 후 더이상들어오지않음')
      });
      //보상
      pluscoin40andscore70();
      }
      if (achievenum >=20 && achive7==0){
        AsyncStorage.setItem(nickname+'업적7', '1', () => {
        console.log('업적 7 1번 완료 후 더이상들어오지않음')
      });
      //보상
      pluscoin50andscore90();
      }

      


    }
    getinformation();


    
    
    //console.log("유저닉네임:" , nickname);
    //console.log("동물 숫자:" , animalnum);
    
    //업적 달성여부 측정
    //동물 5종 수집 업적
    
    

  },[]);

  return (
    <ScrollView>
      <WingBlank size="lg">
        <Card>
          <Card.Header       
            title="동물 수집가 Lv.1 (5종)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb= {(achiv1==1) ?"https://ifh.cc/g/FDVkny.png" :"https://ifh.cc/g/JKHCsn.png" }
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
      <WingBlank size="lg">
        <Card>
          <Card.Header
            title="동물 수집가 Lv.2 (10종)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb= {(achiv2==1) ?"https://ifh.cc/g/FDVkny.png" :"https://ifh.cc/g/JKHCsn.png" }
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
      <WingBlank size="lg">
        <Card>
          <Card.Header
            title="퀘스트 마스터 Lv.1 (10회)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb= {(achiv3==1) ?"https://ifh.cc/g/h0ShwY.png" :"https://ifh.cc/g/JKHCsn.png" }
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
      <WingBlank size="lg">
        <Card>
          <Card.Header
            title="퀘스트 마스터 Lv.2 (20회)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={(achiv7==1) ?"https://ifh.cc/g/h0ShwY.png" :"https://ifh.cc/g/JKHCsn.png" }
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
      <WingBlank size="lg">
        <Card>
          <Card.Header
            title="귀여운 동물 모으기"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={(achiv4==1) ? "https://ifh.cc/g/7Oc0MX.jpg" :"https://ifh.cc/g/JKHCsn.png" }
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
      <WingBlank size="lg">
        <Card>
          <Card.Header
            title="큰 동물 모으기"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={(achiv5==1) ? "https://ifh.cc/g/G4z5x9.png" :"https://ifh.cc/g/JKHCsn.png" }
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
      <WingBlank size="lg">
        <Card>
          <Card.Header
            title="작은 동물 모으기"
            thumbStyle={{ width: 35, height: 35 }}
            thumb={(achiv6==1) ? "https://ifh.cc/g/ds8Gbh.png" :"https://ifh.cc/g/JKHCsn.png" }
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


      {/* <View style={styles.AchivementContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.MainText}>동물 5종 모으기</Text>
          <Text style={styles.SubText} numberOfLines={1}>
            서로 다른 동물 5종을 모아보세요
          </Text>
        </View>
        <View style={styles.buttonImageContainer}>
          <Image
            source={
              check === false
                ? require('../../images/emptystar.png')
                : require('../../images/star.png')
            }
            style={styles.buttonImage}
          />
        </View>
      </View>

      <View style={styles.AchivementContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.MainText}>동물 10종 모으기</Text>
          <Text style={styles.SubText} numberOfLines={1}>
            서로 다른 동물 10종을 모아보세요
          </Text>
        </View>
        <View style={styles.buttonImageContainer}>
          <Image
            source={
              check == false
                ? require('../../images/emptystar.png')
                : require('../../images/star.png')
            }
          />
        </View>
      </View>

      <View style={styles.AchivementContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.MainText}>동물 20종 모으기</Text>
          <Text style={styles.SubText} numberOfLines={1}>
            서로 다른 동물 20종을 모아보세요
          </Text>
        </View>
        <View style={styles.buttonImageContainer}>
          <Image
            source={
              check == false
                ? require('../../images/emptystar.png')
                : require('../../images/star.png')
            }
            style={styles.buttonImage}
          />
        </View>
      </View>

      <View style={styles.AchivementContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.MainText}>포유류 10종 모으기</Text>
          <Text style={styles.SubText} numberOfLines={1}>
            포유류 10종을 모아보세요
          </Text>
        </View>
        <View style={styles.buttonImageContainer}>
          <Image
            source={
              check == false
                ? require('../../images/emptystar.png')
                : require('../../images/star.png')
            }
            style={styles.buttonImage}
          />
        </View>
      </View>

      <View style={styles.AchivementContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.MainText}>양서류 10종 모으기</Text>
          <Text style={styles.SubText} numberOfLines={1}>
            양서류 10종을 모아보세요
          </Text>
        </View>
        <View style={styles.buttonImageContainer}>
          <Image
            source={
              check == false
                ? require('../../images/emptystar.png')
                : require('../../images/star.png')
            }
            style={styles.buttonImage}
          />
        </View>
      </View>

      <View style={styles.AchivementContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.MainText}>파충류 10종 모으기</Text>
          <Text style={styles.SubText} numberOfLines={1}>
            파충류 10종을 모아보세요
          </Text>
        </View>
        <View style={styles.buttonImageContainer}>
          <Image
            source={
              check == false
                ? require('../../images/emptystar.png')
                : require('../../images/star.png')
            }
            style={styles.buttonImage}
          />
        </View>
      </View>

      <View style={styles.AchivementContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.MainText}>조류 10종 모으기</Text>
          <Text style={styles.SubText} numberOfLines={1}>
            조류 10종을 모아보세요
          </Text>
        </View>
        <View style={styles.buttonImageContainer}>
          <Image
            source={
              check == false
                ? require('../../images/emptystar.png')
                : require('../../images/star.png')
            }
            style={styles.buttonImage}
          />
        </View>
      </View> */}
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
