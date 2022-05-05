import React , {useState} from 'react';
import { Pressable,Image, Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Modal, Alert} from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { listenerCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';

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
대나무 - 판다
물고기 - 여우, 펭귄
소고기 - 고양이, 호랑이, 여우
지렁이 - 비둘기, 거북이
사료 - 강아지
과일 - 코끼리 비둘기 여우
*/

function FeedShop() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [feedname, setfeedname] = useState('');
  const [coin, setcoin] = useState('');
  const [feedpicture, setfeedpicture] = useState(1);

  


  const array = [
    {
    id: 0,
    src: require("../../images/대나무.png"),
    },
    {
    id: 1,
    src: require("../../images/풀.png"),
    },

    //추가 먹이있으면 array 에 정렬
    //구매버튼 클릭시 array에서 필요한 먹이를 setfeddpicture로 전달
  ];
    
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
        <View style = {styles.encycloContainer}>
          <Text style = {styles.bigtext}>나의 보유 먹이</Text>
          <View style = {styles.feedhavetextContainer}>

          </View>
          <Pressable
          style={[styles.ModalbuttonContainer]}
          onPress={() => setModalVisible(!modalVisible)}
          >
          <Text style={styles.statetext}>닫기</Text>
          </Pressable>

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
        <View style = {styles.encycloContainer}>
          <Text style = {styles.bigtext}>구매하기</Text>
          <View style = {styles.imageContainer}>
            
            <Image
              source={array[feedpicture].src}
              style={styles.FeedImageonbuybutton}
            />

          </View>
          
          <Text>
            "{feedname}"을(를) 구매하시겠습니까?
          </Text>
          <Text>
            가격: 80코인
          </Text>
          <Text>
            현재 보유 코인: 180코인
          </Text>

          <View style= {styles.stateContainer2}>
            <Pressable
            style={[styles.ModalbuttonContainer]}
            onPress={() => {setModalVisible2(!modalVisible2),setModalVisible3(true)}}
            >    
            <Text style={styles.statetext}>예</Text>
            </Pressable>

            <Pressable
            style={[styles.ModalbuttonContainer]}
            onPress={() => {setModalVisible2(!modalVisible2),setModalVisible4(true)}}
            >    
            <Text style={styles.statetext}>아니오</Text>
            </Pressable>


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
        <View style = {styles.encycloContainer}>
          <View style = {styles.buyresultContainer}>
            <View style = {styles.buyresultTextContainer}>
              <Text style = {styles.bigtext}>"{feedname}"을(를)</Text>
              <Text style = {styles.bigtext}>
              성공적으로 구매하였습니다.</Text>
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
        <View style = {styles.encycloContainer}>
          <View style = {styles.buyresultContainer}>
            <View style = {styles.buyresultTextContainer}>
              <Text style = {styles.bigtext}>코인이 부족해요!</Text>
              
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


      <View style = {styles.stateContainer}>
        <View style = {styles.smallstateContainer}>
          <Text style={styles.statetext}>나의 보유 코인</Text>
          <Text style={styles.statetext}>180</Text> 
        </View>

        <Pressable 
          style = {styles.smallstateContainer2}
          onPress={()=>setModalVisible(true)}
                  
        >

          <Text style={styles.statetext2}>나의 보유 먹이</Text>
          <Image
            source={require('../../images/icon.png')}
            style={styles.buttonImage}
          />
        </Pressable>
      </View>



      <View style={styles.FeedContainer}>
        <View style={styles.FeedImageContainer}>
          <Image
            source={require('../../images/대나무.png')}
            style={styles.FeedImage}
          />
          <Text style={styles.MainText} numberOfLines={1}>
            대나무
          </Text>
        </View>
        <View style={styles.FeedTextContainer}>
          <View style={styles.FeedTextContainer2}>
            <Text style={styles.SubText} numberOfLines={1}>
              먹는 동물: 판다
            </Text>
            <Text style={styles.SubText} numberOfLines={1}>
              가격: 80 코인
            </Text>
          </View>
          <View style={styles.FeedTextContainer3}>
            <Pressable style={styles.buttonContainer}
            onPress={()=>{setfeedname('대나무'), setModalVisible2(true), 
              setfeedpicture(0)}}>          
              <Text style={styles.buttonContainer2}>
                구매
              </Text>

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
            <Pressable style={styles.buttonContainer}
            onPress={()=>{setfeedname('풀'), setModalVisible2(true), 
              setfeedpicture(1)}}>          
              <Text style={styles.buttonContainer2}>
                구매
              </Text>

            </Pressable>
          </View>
        </View>      
      </View>
      </ScrollView>
  );


  
}
const styles = StyleSheet.create({
  buyresultTextContainer:{
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',



  },
  buyresultContainer:{
    width: 250,
    height: 150,
    borderWidth: 1,
    backgroundColor : 'white'
  },

  imageContainer:{
    marginVertical: 10,
    height: 150,
    width: 150,
    borderRadius: 90,
    borderWidth: 1,
    backgroundColor : '#FFF7EB'

  },

  FeedImageonbuybutton:{
    marginVertical: 10,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    flex:1

  },
  bigtext:{
    color: 'black',
    fontSize: 20,
    fontFamily: 'OneMobileBold',
    padding: 3,

  },

  feedhavetextContainer:{
    width: 250,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor : '#FFF7EB'

  },

  encycloContainer: {
    flex: 1,
    backgroundColor: 'transpart',
    alignItems: 'center',
    justifyContent: 'center',
  },


  stateContainer:{
    flex:1,
    flexDirection: 'row',},

  stateContainer2:{
    flexDirection: 'row',},

  smallstateContainer:{
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 20,
    paddingHorizontal: 20,
    flex:1},

    smallstateContainer2:{
      borderRadius: 8,
      padding: 20,
      marginHorizontal: 20,
      alignItems: 'center',
      backgroundColor: '#F2A03F',
      borderWidth: 1,
      borderColor: 'gray',
      marginVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      flex:1},

    statetext:{
      color: 'black',
      fontSize: 12,
      fontFamily: 'OneMobileBold',
      padding: 3,
    },

    statetext2:{
      color: 'white',
      fontSize: 12,
      fontFamily: 'OneMobileBold',
    },

    buttonImage: {
      resizeMode: 'contain',
      width: '150%',
      height: '150%',
      flex:1
    },

  FeedImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },

  FeedImageContainer: { 
    flex: 1,
    alignItems: 'center'
  
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

  buttonContainer: {
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#E3562A',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 25,
    
  },
  ModalbuttonContainer: {
    padding: 5,
    alignItems: 'center',
    paddingHorizontal: 25,
    
  },
  buttonContainer2:{
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
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    paddingHorizontal: 20,
  },

  MainText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'OneMobileBold',
    padding:10,
  },

  SubText: { fontFamily: 'OneMobileRegular', paddingTop: 5 },
});


export default FeedShop;