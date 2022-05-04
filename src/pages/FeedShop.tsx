import React from 'react';
import { Pressable,Image, Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function FeedShop() {
  return (
    <ScrollView>
      <View style = {styles.stateContainer}>
        <View style = {styles.smallstateContainer}>
          <Text style={styles.statetext}>나의 보유 코인</Text>
        </View>


        <Pressable style = {styles.smallstateContainer2}>

          <Text style={styles.statetext}>나의 보유 먹이</Text>
          <Image
            source={require('../../images/icon.png')}
            style={styles.buttonImage}
          />


        </Pressable>
      </View>



      <View style={styles.FeedContainer}>
        <View style={styles.FeedImageContainer}>
          <Image
            source={require('../../images/star.png')}
            style={styles.FeedImage}
          />
          <Text style={styles.MainText} numberOfLines={1}>
            당근
          </Text>
        </View>
        <View style={styles.buttonTextContainer}>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.SubText} numberOfLines={1}>
              먹는 동물: 
            </Text>
            <Text style={styles.SubText} numberOfLines={1}>
              가격: 
            </Text>
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
    padding: 20,
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
      backgroundColor: 'F2A03F',
      borderWidth: 1,
      borderColor: 'gray',
      marginVertical: 20,
      paddingHorizontal: 20,
      flex:5},

    statetext:{
      color: 'black',
      fontSize: 12,
      fontFamily: 'OneMobileBold',

    },
  



  FeedImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },

  buttonImage: {
    resizeMode: 'contain',
    width: '50%',
    height: '50%',
  },



  FeedImageContainer: { 
    flex: 1,
    alignItems: 'center'
  
  },
  buttonTextContainer: {
    flex: 3,
    flexDirection: 'column',
  },

  FeedContainer: {
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
    fontSize: 12,
    fontFamily: 'OneMobileBold',
  },

  SubText: { fontFamily: 'OneMobileRegular', paddingTop: 3 },
});


export default FeedShop;