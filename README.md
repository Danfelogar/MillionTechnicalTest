# Million's Technical Test: Mobile react-native

I hope to meet and exceed your expectations. This React Native (0.78.2) project is based on a modular/feature architecture with implementation of OOP (Object-Oriented Programming). I split this application by features, where each feature is composed of models, use-cases, services, screens, specialized components and custom hooks. All of this is designed to achieve single responsibility for each component and optimize reusability.




## Setup Enviroment
Project created with React Native CLI.[ See official docs](https://reactnative.dev/docs/environment-setup) to set up the environment.

1. install all dependencies with:

```bash
 npm install
```

2. install pods:

```bash
cd ios && pod install && cd ..
```

3. copy the content in `.env.example` or change name to `.env`(only works in this projects because the only value is an url and not be a secret key)

4. Run metro in other terminal tap (Optional):

```bash
npm start
```

5. Run in iOS simulator, also you can open Xcode and run 2 different schemas (Debug or Release), with this command you can run in debug mode:

```bash
npm run ios
```

6. Run in Android simulator:

```bash
npm run android
```
If you have any problem, these're my actual global versions:

```bash
node -v             -> v20.17.0
npm -v              -> 11.3.0
npx metr0 --version -> 0.81.5
```

### Other commands:

1. Gradlew clean:

```bash
npm run  android:clean
```

## 🛠 Tech and Libraries

- [React Native](https://reactnative.dev/) Library js
- [TypeScript](https://www.typescriptlang.org/)Application typing stronger
- [React Navigation](https://reactnavigation.org/): Routing and navigation
- [React Hook Form](https://react-hook-form.com/get-started): Build scalable and performant forms
- [Axios](https://github.com/axios/axios): Promise based HTTP client
- [Zustand](https://redux-toolkit.js.org/Í): Data storage more  efficient and easy to handler than Redux or Redux Toolkit
- [Jest](https://jestjs.io/): JavaScript testing framework used to write unit and integration tests
- [@testing-library/react-native](https://testing-library.com/docs/react-native-testing-library/intro/): Simple and complete React Native testing utilities that encourage good testing practices
- [react-native-config](https://github.com/luggit/react-native-config): Manage environment-specific variables in your React Native apps

## Command tree for the files
```bash
├── App.tsx
├── Gemfile
├── Gemfile.lock
├── README.md
├── app.json
├── babel.config.js
├── gesture-handler.js
├── gesture-handler.native.js
├── index.js
├── jest.config.js
├── metro.config.js
├── package-lock.json
├── package.json
├── react-native-config.d.ts
├── src
│   ├── app
│   │   └── navigation
│   │       ├── MainNavigation.tsx
│   │       └── __test__
│   │           └── MainNavigation.test.tsx
│   ├── features
│   │   ├── crypto
│   │   │   ├── components
│   │   │   │   ├── CryptoCard.tsx
│   │   │   │   ├── CryptoListComponent.tsx
│   │   │   │   ├── InfoDetail.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks
│   │   │   │   ├── __test__
│   │   │   │   │   ├── useCryptos.test.ts
│   │   │   │   │   └── useSingleCrypyo.test.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── useCryptos.ts
│   │   │   │   └── useSingleCrypyo.ts
│   │   │   ├── index.ts
│   │   │   ├── model
│   │   │   │   ├── CryptoByIdNet.ts
│   │   │   │   ├── CryptoNet.ts
│   │   │   │   ├── CryptoUi.ts
│   │   │   │   └── index.ts
│   │   │   ├── screens
│   │   │   │   ├── DetailsScreen.tsx
│   │   │   │   ├── HomeScreen.tsx
│   │   │   │   └── index.ts
│   │   │   ├── services
│   │   │   │   ├── cryptoServices.ts
│   │   │   │   └── index.ts
│   │   │   └── use-cases
│   │   │       ├── __test__
│   │   │       │   ├── getCryptoById.test.ts
│   │   │       │   └── getCryptoList.test.ts
│   │   │       ├── getCryptoById.ts
│   │   │       ├── getCryptoList.ts
│   │   │       └── index.ts
│   │   └── index.ts
│   ├── index.ts
│   └── shared
│       ├── __mocks__
│       │   ├── EvilIconsMock.tsx
│       │   ├── cryptoApiResMock.ts
│       │   ├── cryptoStoreMock.ts
│       │   ├── globalMocks.ts
│       │   ├── index.ts
│       │   └── zustand.ts
│       ├── __test__
│       │   ├── index.ts
│       │   └── setup-jest.ts
│       ├── api
│       │   ├── crytopApi.ts
│       │   └── index.ts
│       ├── assets
│       │   ├── imgs
│       │   │   ├── devCoding.png
│       │   │   ├── loading.png
│       │   │   ├── logoBitCoin.png
│       │   │   ├── logoTitle.png
│       │   │   └── notFound.png
│       │   ├── index.ts
│       │   └── sourceImgs.ts
│       ├── components
│       │   ├── BrandWrapper.tsx
│       │   ├── ButtonGeneric.tsx
│       │   ├── CustomImage.tsx
│       │   ├── StandardWrapper.tsx
│       │   ├── index.ts
│       │   └── inputs
│       │       ├── InputGeneric.tsx
│       │       └── index.ts
│       ├── hooks
│       │   ├── __test__
│       │   │   └── useDebouncedValue.test.ts
│       │   ├── index.ts
│       │   └── useDebouncedValue.ts
│       ├── index.ts
│       ├── interfaces
│       │   ├── button.ts
│       │   ├── customImageProps.ts
│       │   ├── index.ts
│       │   ├── inputs.ts
│       │   └── navigations.ts
│       ├── store
│       │   ├── __test__
│       │   │   └── cryptoStore.test.ts
│       │   ├── crytoStore.ts
│       │   ├── index.ts
│       │   └── interface
│       │       ├── crypto.ts
│       │       └── index.ts
│       └── utils
│           ├── const
│           │   ├── index.ts
│           │   └── number.ts
│           ├── index.ts
│           ├── isIOS.ts
│           └── phoneDimensions.ts
└── tsconfig.json

```

## Link-video-demo-app

[![Alt text](https://img.youtube.com/vi/I49hxa-rmFQ/0.jpg)](https://youtu.be/I49hxa-rmFQ)

## App Screenshots


|                                 |                  Mobile                    |
| :------------------------------:| :-----------------------------------------:|
|               Home              |  ![](src/shared/assets/imgs/screen1.png)   |
|               Details           |  ![](src/shared/assets/imgs/screen2.png)   |
