import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({ navigation }: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text) => {
    setEmail(text.trim());
  }, []);
  const onChangeNickname = useCallback((text) => {
    setNickname(text.trim());
  }, []);
  const onChangeName = useCallback((text) => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback((text) => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    console.log(email, name, password);
    Alert.alert('알림', '회원가입 되었습니다.');
  }, [email, name, password]);

  const canGoNext = email && name && password;
  return (
    <DismissKeyboardView style={{ backgroundColor: 'white' }}>
      <View style={styles.appLogoWrapper}>
        <Image
          source={{ uri: 'https://ifh.cc/g/Hsn11h.png' }} // Sample image
          style={styles.appLogo}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeName}
          value={name}
          textContentType="name"
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nameRef}
          onSubmitEditing={() => nicknameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.textInput}
          placeholder="닉네임을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeNickname}
          value={nickname}
          textContentType="nickname"
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nicknameRef}
          onSubmitEditing={() => emailRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요."
          placeholderTextColor="#666"
          textContentType="emailAddress"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false} // 키보드 on 상태 유지
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="영문,숫자,특수문자 포함 8자 이상 입력하세요."
          placeholderTextColor="#666"
          onChangeText={onChangePassword}
          value={password}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!canGoNext}
          onPress={onSubmit}
        >
          <Text style={styles.loginButtonText}>회원가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  appLogoWrapper: {
    alignItems: 'center',
    paddingTop: 5,
  },
  appLogo: {
    width: 156,
    height: 112,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: 'OneMobileBold',
  },
  buttonZone: {
    alignItems: 'center',
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
});

export default SignUp;
