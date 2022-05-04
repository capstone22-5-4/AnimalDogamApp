import React from 'react';
import { Pressable,Image, Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function FeedShop() {
  return (
    <ScrollView>
      <View style = {styles.stateContainer}>
        <View style = {styles.smallstateContainer}>
          <Text style={styles.statetext}>나의 보유 코인</Text>
          <Text style={styles.statetext}>180</Text>
        </View>



        <Pressable style = {styles.smallstateContainer2}>

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
            <Pressable style={styles.buttonContainer}>
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
  stateContainer:{
    flex:1,
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
      flex:5
    },

    statetext2:{
      color: 'white',
      fontSize: 12,
      fontFamily: 'OneMobileBold',
      flex:5
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
    flex: 3,
    paddingLeft: 20,
  },
  FeedTextContainer3: {
    flex: 1,
  },

  buttonContainer: {
    flex:1,
    alignItems: 'flex-end',
    
  },
  buttonContainer2:{
    flex: 1,
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#E3562A',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 25,
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