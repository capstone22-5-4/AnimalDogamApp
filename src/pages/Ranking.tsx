import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type RankingProps = {
  rank: number;
  nickname: string;
  score: number;
};

function Ranking() {
  const [ranks, setRanks] = useState<RankingProps[] | null>([
    { rank: 1, nickname: 'gildong', score: 880 },
    { rank: 2, nickname: 'puang', score: 820 },
    { rank: 3, nickname: 'cau123', score: 770 },
    { rank: 4, nickname: 'zzanggu', score: 750 },
    { rank: 5, nickname: 'adminNickname', score: 730 },
    { rank: 6, nickname: 'capstone22', score: 720 },
    { rank: 7, nickname: 'dogamAnimal', score: 500 },
    { rank: 8, nickname: 'gogo9876', score: 470 },
    { rank: 9, nickname: 'happy', score: 220 },
    { rank: 10, nickname: 'simpson', score: 180 },
    { rank: 11, nickname: 'apple001', score: 150 },
    { rank: 12, nickname: 'animalLove', score: 110 },
  ]); // mockup data

  const Item = ({ rank, nickname, score }: RankingProps) => (
    <View style={styles.item}>
      <Text style={styles.rankingText}>{rank}위</Text>
      <Text style={styles.nicknameText}>{nickname}</Text>
      <Text style={styles.scoreText}>{score}점</Text>
    </View>
  );

  const renderItem: ListRenderItem<RankingProps> = ({ item }) => (
    <Item rank={item.rank} nickname={item.nickname} score={item.score} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.rankingImageWrapper}>
        <Image
          source={require('../../images/ranking_main.png')}
          style={styles.rankingImage}
        />
      </View>
      <View style={styles.tableWrapper}>
        <FlatList
          data={ranks}
          renderItem={renderItem}
          keyExtractor={(item) => item.rank.toString()}
          style={styles.flatList}
        />
      </View>
    </View>
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
    resizeMode: 'contain',
    marginVertical: 10,
  },
  tableWrapper: {
    flex: 4,
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
    borderWidth: StyleSheet.hairlineWidth,
  },
  nicknameText: {
    flex: 3,
    fontSize: 15,
    fontFamily: 'OneMobileBold',
  },
  rankingText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'OneMobileRegular',
    paddingLeft: 5,
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
    backgroundColor: '#F97500',
  },
});
