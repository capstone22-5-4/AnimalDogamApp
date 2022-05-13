import axios from 'axios';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

function Quest() {
  useEffect(() => {
    async function getFriendDogam() {
      const response = await axios.get(`${Config.API_URL}/book/list/rand`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response.data);
    }
    getFriendDogam();
  });

  return (
    <View>
      <View style={styles.visitButtonContainer}>
        <Pressable style={styles.visitButton}>
          <Text style={styles.visitButtonText}>
            다른 친구의 도감에 방문하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Quest;

const styles = StyleSheet.create({
  visitButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    backgroundColor: '#F27E00',
  },
  visitButtonContainer: {
    alignItems: 'center',
  },
  visitButtonText: {
    fontSize: 15,
    fontFamily: 'OneMobileRegluar',
    color: 'white',
  },
});
