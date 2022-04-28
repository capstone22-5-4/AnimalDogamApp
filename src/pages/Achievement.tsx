import React, {useState,useCallback} from 'react';
import {Image, Text,StyleSheet,View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios, { AxiosError } from 'axios';


type AchiveProps = {
  no: number;
  animalName: string;
};



function Achievement() {
  const [check, setcheck] = useState(false);
  const URL = "http://3.35.222.94:8880/analmal/book/list/has";





  return (
    <ScrollView>
      <View style={styles.AchivementContainer}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.MainText}>동물 5종 모으기</Text> 
          <Text style={styles.SubText} numberOfLines={1}>
            서로 다른 동물 5종을 모아보세요
          </Text>
        </View>
        <View style= {styles.buttonImageContainer}>
           
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
          <Text style={styles.MainText}>동물 10종 모으기</Text> 
          <Text style={styles.SubText} numberOfLines={1}>
            서로 다른 동물 10종을 모아보세요
          </Text>
        </View>
        <View style= {styles.buttonImageContainer}>
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
        <View style= {styles.buttonImageContainer}>
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
        <View style= {styles.buttonImageContainer}>
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
        <View style= {styles.buttonImageContainer}>
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
        <View style= {styles.buttonImageContainer}>
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
        <View style= {styles.buttonImageContainer}>
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
