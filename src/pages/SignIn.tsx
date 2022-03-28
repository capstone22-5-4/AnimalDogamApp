import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useRef, useState } from 'react';
import { Image } from 'react-native';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { RootStackParamList } from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text) => {
    setPassword(text);
  }, []);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;
  return (
    <DismissKeyboardView style={{ backgroundColor: 'white' }}>
      <View style={styles.appLogoWrapper}>
        <Image
          source={{ uri: 'https://ifh.cc/g/fvOgR4.png' }} // Sample image
          style={styles.appLogo}
        />
      </View>
      <View style={styles.appNameWrapper}>
        <Text style={styles.appNameText}>동물 도감</Text>
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
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
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
  );
}

const styles = StyleSheet.create({
  appLogoWrapper: {
    alignItems: 'center',
    paddingTop: 20,
  },
  appLogo: {
    width: 192,
    height: 81,
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
    paddingVertical: 12,
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
