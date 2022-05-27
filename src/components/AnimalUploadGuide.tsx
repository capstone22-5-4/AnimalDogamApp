/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import Swiper from 'react-native-swiper';

const AnimalUploadGuide = () => {
  const [openGuide, setOpenGuide] = useState(true);
  return openGuide === true ? (
    <View style={styles.wrapper}>
      <Swiper showsButtons={true} loop={false}>
        <View style={styles.slide1}>
          <Image
            source={require('../../images/attention.png')}
            style={styles.guidePhoto}
          />
          <View style={{ flex: 2 }}>
            <Text style={[styles.text, { color: 'red', fontSize: 40 }]}>
              잠깐!
            </Text>
            <Text style={styles.text}>
              사진을 등록하기 전에 꼭 확인해주세요.
            </Text>
          </View>
        </View>
        <View style={styles.slide1}>
          <Image
            source={require('../../images/selfie.png')}
            style={styles.guidePhoto}
          />
          <View style={{ flex: 2 }}>
            <Text style={styles.attentionText}>
              등록한 사진은 다른 사용자에 의해 조회될 수 있습니다.
            </Text>
            <Text style={styles.attentionText}>
              개인정보보호를 위해 본인 얼굴, 개인정보가 포함된 사진은 올리지
              말아주세요.
            </Text>
          </View>
        </View>
        <View style={styles.slide1}>
          <Image
            source={require('../../images/oneSpecies.png')}
            style={[styles.guidePhoto, { width: '70%' }]}
          />
          <View style={{ flex: 2 }}>
            <Text style={styles.attentionText}>
              정확한 사진 분석을 위해 한 장의 사진에는 한 종류의 동물만
              찍어주세요.
            </Text>
          </View>
        </View>
        <View style={styles.slide1}>
          <Image
            source={require('../../images/animal_size.png')}
            style={[styles.guidePhoto, { width: '70%' }]}
          />
          <View style={{ flex: 2 }}>
            <Text style={styles.attentionText}>
              동물이 너무 작게 나온 사진은 어떤 동물인지 알아볼 수 없어요.
            </Text>
          </View>
        </View>
      </Swiper>
      <View
        style={{
          backgroundColor: 'rgb(203, 240, 255)',
          height: 50,
          right: 0,
          alignItems: 'flex-end',
        }}
      >
        <Pressable
          onPress={() => setOpenGuide(false)}
          style={{
            backgroundColor: 'rgb(203, 240, 255)',
            height: 50,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 15 }}>닫기</Text>
        </Pressable>
      </View>
    </View>
  ) : null;
};

export default AnimalUploadGuide;

const styles = StyleSheet.create({
  guidePhoto: {
    width: '50%',
    resizeMode: 'contain',
    flex: 4,
  },
  wrapper: { flex: 1, position: 'absolute', height: '100%' },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(203, 240, 255)',
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontFamily: 'Cafe24Shiningstar',
    marginBottom: 5,
  },
  attentionText: {
    color: '#000',
    fontFamily: 'OneMobileRegular',
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 5,
  },
});
