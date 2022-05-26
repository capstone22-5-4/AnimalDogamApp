import React, { useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch } from '../store';
import axios, { AxiosError } from 'axios';
import userSlice from '../slices/user';
import Config from 'react-native-config';
import { Gravatar } from 'react-native-gravatar';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const email = useSelector((state: RootState) => state.user.email);

  const dispatch = useAppDispatch();
  const onLogout = useCallback(async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/user/logout`);
      console.log(response.data);
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          nickname: '',
          email: '',
          score: 0,
          credit: 0,
        }),
      );
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
  }, [dispatch]);

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={require('../../images/menu_background.png')}
          style={styles.profileBackground}
        >
          <Gravatar
            options={{
              email: email,
              parameters: { size: '180', d: 'retro' },
              secure: true,
            }}
            style={styles.profileImage}
          />
          <Text style={styles.nicknameText}>{nickname}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </ImageBackground>
        <View style={styles.menuContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.logoutArea}>
        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <View style={styles.logoutTextContainer}>
            <FontAwesome5Icon name="sign-out-alt" size={20} />
            <Text style={styles.logoutText}>로그아웃</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#fffff',
    paddingTop: 10,
  },
  nicknameText: {
    fontSize: 15,
    fontFamily: 'OneMobileBold',
    color: 'black',
  },
  emailText: {
    fontSize: 14,
    fontFamily: 'OneMobileRegular',
    fontStyle: 'italic',
  },
  profileBackground: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  logoutArea: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  logoutButton: {
    paddingVertical: 15,
  },
  logoutTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    fontFamily: 'OneMobileRegular',
    marginLeft: 10,
  },
});
