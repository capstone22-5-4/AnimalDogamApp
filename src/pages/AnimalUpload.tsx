import { useIsFocused } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { WebView } from 'react-native-webview';
import userSlice from '../slices/user';
import { useAppDispatch } from '../store';

function AnimalUpload() {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadCoin() {
      try {
        const response = await axios.get(`${Config.API_URL}/credit`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });
        //console.log(response.data);
        dispatch(userSlice.actions.setCredit(response.data));
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        console.log(errorResponse);
      }
    }
    loadCoin();
  }, [dispatch, isFocused]);

  useEffect(() => {
    async function loadScore() {
      try {
        const response = await axios.get(`${Config.API_URL}/score`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });
        //console.log(response.data);
        dispatch(userSlice.actions.setScore(response.data));
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        console.log(errorResponse);
      }
    }
    loadScore();
  }, [dispatch, isFocused]);

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `${Config.API_URL}/analmal`,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AnimalUpload;
