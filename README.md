# AnimalDogamApp

**2022.03.28 update**

## Starting an app in local

#### 1. react-native 환경설정

- jdk 11 version & 환경변수 설정(JAVA_HOME)
- Android SDK **30**, Emulator: **Nexus 5**
- adb 설치 필요 & ANDROID_HOME 환경변수 설정
- https://reactnative.dev/docs/environment-setup 참조

#### 2. 앱 실행하기

```
git clone https://github.com/capstone22-5-4/AnimalDogamApp.git
cd AnimalDogamApp
npm run android
```

---

### Git flow

![git-flow](./images/gitflow-1.png)

- feature branch(ex. login)를 만들어 개발을 진행한 후에 에러가 없는 부분에 한해서 dev branch로 pr 후 merge
- dev에서 main brach로의 merge는 기능 테스트 후에 진행(1~2주 주기)
- 각 feature branch끼리 필요한 것은 merge하여 사용

---

## Note

- yarn.lock 파일은 변경 금지
- git pull한 후에는 `npm install` 진행 후 실행
- 환경변수를 사용할 경우 `.env` 파일 확인 후 실행(ignore 되어 pull 되지 않음)

- react-native는 0.66버전 유지(0.66.4 사용 / 업그레이드 금지)
- react-native-reanimated는 2.2.0 버전 이하로 유지

---

## Error solution

#### 1. 프로젝트 빌드를 실패할 경우 (Build FALIED)

    ```
    cd android
    ./gradlew clean

    cd .. // 프로젝트 홈 directory로 이동
    npm start --reset-cache
     ```

<br />

#### 2. Error: listen EADDRINUSE: address already in use :::8081

: 이미 metro 서버가 켜져 있는 경우이므로, metro 서버를 실행하고 있는 터미널을 종료 후 다시 실행
<br />

#### 3. java.lang.RuntimeException: Unable to load script. Make sure you're either running Metro (run 'npx react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release.

: android/app/src/main/assets 폴더 만들기

```
cd android
./gradlew clean
cd ..
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
```

<br />

#### 4. Execution failed for task ':app:packageDebug'. > java.lang.OutOfMemoryError (no error message)

: android/gradle.properties에 다음 줄 추가

```
org.gradle.jvmargs=-XX\:MaxHeapSize\=1024m -Xmx1024m
```
