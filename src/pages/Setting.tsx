import React, { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';

function Setting() {
  const dispatch = useAppDispatch();
  const onLogout = useCallback(async () => {
    try {
      await axios.get(`${Config.API_URL}/user/logout`);
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          nickname: '',
          email: '',
        }),
      );
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
  }, [dispatch]);

  return (
    <View>
      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive,
          )}
          onPress={onLogout}
        >
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonZone: {
    alignItems: 'center',
    paddingTop: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'orange',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Setting;
