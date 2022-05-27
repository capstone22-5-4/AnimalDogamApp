import { useIsFocused } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import Trophy from '../animations/Trophy';
import Confetti from '../animations/Confetti';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import LinearGradient from 'react-native-linear-gradient';

type RankingProps = {
  no: number;
  nickname: string;
  score: number;
};

function Ranking() {
  const myNickname = useSelector((state: RootState) => state.user.nickname);
  const [ranks, setRanks] = useState<RankingProps[] | null>([]); // mockup data
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadRanking() {
      try {
        const response = await axios.get(`${Config.API_URL}/top10`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });
        setRanks(response.data);
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        console.log(errorResponse);
      }
    }

    loadRanking();
  }, [isFocused]);

  const Item = ({ no, nickname, score }: RankingProps) =>
    nickname === myNickname ? (
      no === 1 ? (
        <View
          style={[
            styles.item,
            {
              backgroundColor: '#ffef11',
            },
          ]}
        >
          <Text style={styles.rankingText}>{no}위</Text>
          <Text style={styles.nicknameText}>{nickname} (나)</Text>
          <Text style={styles.scoreText}>{score}점</Text>
        </View>
      ) : no === 2 ? (
        <View
          style={[
            styles.item,
            {
              backgroundColor: '#d8d8d8',
            },
          ]}
        >
          <Text style={styles.rankingText}>{no}위</Text>
          <Text style={styles.nicknameText}>{nickname} (나)</Text>
          <Text style={styles.scoreText}>{score}점</Text>
        </View>
      ) : no === 3 ? (
        <View
          style={[
            styles.item,
            {
              backgroundColor: '#df9100ab',
            },
          ]}
        >
          <Text style={styles.rankingText}>{no}위</Text>
          <Text style={styles.nicknameText}>{nickname} (나)</Text>
          <Text style={styles.scoreText}>{score}점</Text>
        </View>
      ) : (
        <View style={styles.item}>
          <Text style={styles.rankingText}>{no}위</Text>
          <Text style={styles.nicknameText}>{nickname}</Text>
          <Text style={styles.scoreText}>{score}점</Text>
        </View>
      )
    ) : no === 1 ? (
      <View style={[styles.item, { backgroundColor: '#ffef11' }]}>
        <Text style={styles.rankingText}>{no}위</Text>
        <Text style={styles.nicknameText}>{nickname}</Text>
        <Text style={styles.scoreText}>{score}점</Text>
      </View>
    ) : no === 2 ? (
      <View style={[styles.item, { backgroundColor: '#d8d8d8' }]}>
        <Text style={styles.rankingText}>{no}위</Text>
        <Text style={styles.nicknameText}>{nickname}</Text>
        <Text style={styles.scoreText}>{score}점</Text>
      </View>
    ) : no === 3 ? (
      <View style={[styles.item, { backgroundColor: '#df9100ab' }]}>
        <Text style={styles.rankingText}>{no}위</Text>
        <Text style={styles.nicknameText}>{nickname}</Text>
        <Text style={styles.scoreText}>{score}점</Text>
      </View>
    ) : (
      <View style={styles.item}>
        <Text style={styles.rankingText}>{no}위</Text>
        <Text style={styles.nicknameText}>{nickname}</Text>
        <Text style={styles.scoreText}>{score}점</Text>
      </View>
    );

  const renderItem: ListRenderItem<RankingProps> = ({ item }) => (
    <Item no={item.no} nickname={item.nickname} score={item.score} />
  );

  return (
    <LinearGradient
      colors={['#00028a', '#00014e', '#000127']}
      style={styles.container}
    >
      <View style={styles.rankingImageWrapper}>
        <Trophy style={styles.rankingImage} />
      </View>
      <View style={styles.tableWrapper}>
        <FlatList
          data={ranks}
          renderItem={renderItem}
          keyExtractor={(item) => item.no.toString()}
          style={styles.flatList}
        />
      </View>
      <Confetti
        style={[styles.rankingImage, { position: 'absolute', height: '100%' }]}
      />
    </LinearGradient>
  );
}

export default Ranking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  rankingImageWrapper: {
    flex: 1,
    resizeMode: 'contain',
    overflow: 'visible',
  },
  rankingImage: {
    flex: 1,
    // resizeMode: 'contain',
    // marginVertical: 10,
    height: '100%',
  },
  tableWrapper: {
    flex: 3,
    width: '90%',
  },
  BasicText: {
    fontFamily: 'ONEMobileRegular',
    paddingBottom: 0,
    fontSize: 18,
  },
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 3,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  nicknameText: {
    flex: 3,
    fontSize: 15,
    fontFamily: 'OneMobileBold',
    color: 'black',
  },
  rankingText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'OneMobileRegular',
    paddingLeft: 5,
    color: '#000',
  },
  scoreText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'OneMobileRegular',
    textAlign: 'right',
    paddingRight: 5,
  },
  flatList: {
    flexGrow: 0,
    height: '90%',
    backgroundColor: '#ffeee0',
    borderRadius: 10,
  },
});
