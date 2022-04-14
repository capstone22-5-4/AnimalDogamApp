# AnimalDogamApp

## Starting an app in local

#### 1. react-native 환경설정

- jdk 11 version & 환경변수 설정(JAVA_HOME)
- Android SDK **30**, Emulator: **Nexus 5**
- adb 설치 필요 & ANDROID_HOME 환경변수 설정
- https://reactnative.dev/docs/environment-setup 참조
- yarn이 설치되어 있지 않은 경우 다음 명령어를 실행하여 설치
  `npm install -g yarn`

#### 2. `.env` 파일 생성 (for DEV)

- 프로젝트 루트 directory(~/AnimalDogamApp)에 `.env` 파일을 생성한 후 아래 코드 붙여넣기

```
API_URL=http://10.0.2.2:8880
```

#### 3. 서버 실행

- git clone https://github.com/capstone22-5-4/nodejs.git // 처음에만
- 프로젝트 directory(~/nodejs)로 이동 후, `node ./src/mainkp.js`로 실행

#### 4. 앱 실행하기

```
git clone https://github.com/capstone22-5-4/AnimalDogamApp.git
cd AnimalDogamApp
yarn android
```

---

## Note

- <span style='background-color: yellow'> 패키지 매니저로 npm 대신 **yarn**을 사용 **(npm 명령어는 사용하지 말 것)** </span>
- package.json 파일이 변경 된 경우(ex. pull을 하였거나 패키지를 다운로드 한 경우)에는 `yarn`으로 패키지 의존성을 설치 한 후에 진행
- 환경변수를 사용할 경우 `.env` 파일 확인 후 실행(ignore 되어 pull 되지 않음)
- react-native는 0.66버전 유지(0.66.4 사용 / 업그레이드 금지)
- react-native-reanimated는 2.2.0 버전 이하로 유지
- 에뮬레이터 상에서 간헐적으로 "System UI isn't responding" 경고창이 뜨는 경우, `Wait` 버튼 누르고 무시해도 무방
- 전체적인 UI 디자인(stylesheet)은 기본적인 기능 구현 완료 후 수정 예정

---

### Git flow

![git-flow](./images/gitflow-1.png)

- feature branch(ex. login)를 만들어 개발을 진행한 후에 에러가 없는 부분에 한해서 dev branch로 pr 후 merge
- dev에서 main brach로의 merge는 기능 테스트 후에 진행(1~2주 주기)
- 각 feature branch끼리 필요한 것은 merge하여 사용

---

## Error solution

#### 1. 프로젝트 빌드를 실패할 경우 (Build FALIED)

```
cd android
    ./gradlew clean

    cd .. // 프로젝트 홈 directory로 이동
    yarn start --reset-cache
```

#### 2. Error: listen EADDRINUSE: address already in use :::8081

: 이미 metro 서버가 켜져 있는 경우이므로, metro 서버를 실행하고 있는 터미널을 종료 후 다시 실행

#### 3. java.lang.RuntimeException: Unable to load script. Make sure you're either running Metro (run 'npx react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release.

: android/app/src/main/assets 폴더 만들기

```
cd android
./gradlew clean
cd ..
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
```

#### 4. Execution failed for task ':app:packageDebug'. > java.lang.OutOfMemoryError (no error message)

: android/gradle.properties에 다음 줄 추가

```
org.gradle.jvmargs=-XX\:MaxHeapSize\=1024m -Xmx1024m
```
