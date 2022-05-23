import React, { useState, useCallback } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios, { AxiosError } from 'axios';
import { Card, WingBlank } from '@ant-design/react-native';
import FastImage from 'react-native-fast-image';

type AchiveProps = {
  no: number;
  animalName: string;
};

function Achievement() {
  const [check, setcheck] = useState(false);
  const URL = `${Config.API_URL}/analmal/book/list/has`;

  return (
    <ScrollView>
      <WingBlank size="lg">
        <Card>
          <Card.Header
            title="동물 수집가 (5종)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb="https://ifh.cc/g/FDVkny.png"
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
            title="퀘스트 마스터 Lv.1 (10회)"
            thumbStyle={{ width: 35, height: 35 }}
            thumb="https://ifh.cc/g/h0ShwY.png"
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
            thumb="https://ifh.cc/g/JKHCsn.png"
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
