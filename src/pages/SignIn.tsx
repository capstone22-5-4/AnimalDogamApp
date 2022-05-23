/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import { RootStackParamList } from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyboardView';
import userSlice from '../slices/user';
import { useAppDispatch } from '../store';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({ navigation }: SignInScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const dispatch = useAppDispatch();

  const onChangeEmail = useCallback((text) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text) => {
    setPassword(text);
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try {
      setLoading(true);
      const data = { email: email, pw: password };
      const qs = require('qs');
      const response = await axios.post(
        `${Config.API_URL}/user/login`,
        qs.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        },
      );
      console.log(response.data);
      setLoading(false);
      Alert.alert('알림', '로그인 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          nickname: response.data.nickname,
          email: response.data.email,
          score: response.data.score,
          credit: response.data.credit,
        }),
      );
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', '로그인에 실패하였습니다.');
      }
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  }, [loading, email, password, dispatch]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <DismissKeyboardView
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}
      >
        <View style={styles.appLogoWrapper}>
          <FastImage
            source={require('../../images/logo_main_square.jpg')} // *TODO: Change the app logo when determined
            style={styles.appLogo}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.textInput}
            placeholder="이메일을 입력해주세요."
            value={email}
            onChangeText={onChangeEmail}
            importantForAutofill="yes"
            autoComplete="email" // 자동완성(상황에 맞게)
            textContentType="emailAddress"
            keyboardType="email-address" // @가 있는 키보드를 띄우게
            returnKeyType="next" // 키보드의 다음버튼 변경(화살표로)
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }} // 엔터 쳤을 때 처리할 동작
            blurOnSubmit={false} // 키보드가 없어지는 것을 막음
            ref={emailRef}
            clearButtonMode="while-editing" // 입력 중에 X 표시 누르면 모두 지워지게끔 (for IOS)
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry
            importantForAutofill="yes"
            autoComplete="password" // 자동완성
            textContentType="password"
            ref={passwordRef}
            onSubmitEditing={onSubmit} // 엔터 쳤을 때 처리할 동작
            clearButtonMode="while-editing" // 입력 중에 X 표시 누르면 모두 지워지게끔 (for IOS)
          />
        </View>
        <View style={styles.buttonZone}>
          <Pressable
            onPress={onSubmit}
            style={
              !canGoNext
                ? styles.loginButton
                : StyleSheet.compose(
                    styles.loginButton,
                    styles.loginButtonActive,
                  )
            }
            disabled={!canGoNext}
          >
            <Text style={styles.loginButtonText}>로그인</Text>
          </Pressable>
          <Pressable onPress={toSignUp}>
            <Text style={{ fontFamily: 'OneMobileRegular' }}>
              아직 회원이 아니신가요? 회원가입
            </Text>
          </Pressable>
        </View>
      </DismissKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  appLogoWrapper: {
    alignItems: 'center',
  },
  appLogo: {
    width: 250,
    height: 250,
  },
  appNameWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  appNameText: {
    fontSize: 35,
    fontFamily: 'OneMobilePOP',
    color: 'black',
  },
  inputWrapper: {
    paddingBottom: 12,
    paddingHorizontal: 30,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth, // 눈에 보이지만 가장 얇은 두께
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: 'OneMobileBold',
  },
  loginButton: {
    backgroundColor: '#FF9F62',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: '#FF7C29',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'OneMobileBold',
  },
  buttonZone: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default SignIn;
