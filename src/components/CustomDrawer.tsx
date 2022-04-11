import React, { useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {
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

const CustomDrawer = (props) => {
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
          <Image
            source={require('../../images/profile_sample.png')}
            style={styles.profileImage}
          />
          <Text>{nickname}</Text>
          <Text>{email}</Text>
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
  profileBackground: {
    padding: 20,
  },
  profileImage: { height: 80, width: 80, borderRadius: 40, marginBottom: 10 },
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
