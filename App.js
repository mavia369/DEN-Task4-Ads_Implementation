import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen';
import MobileAds, { AdEventType, AppOpenAd, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useRef, useState } from 'react';
import { InteractionManager, View } from 'react-native';
import * as colors from './src/utilities/colors';
import Screen2 from './src/screens/Screen2';
import Screen3 from './src/screens/Screen3';
import Screen4 from './src/screens/Screen4';
import Screen5 from './src/screens/Screen5';
import SplashScreen from 'react-native-splash-screen';
import SignUp from './src/screens/signUp';
import SignIn from './src/screens/signIn';
import Splash from './src/screens/splash';

const Stack = createNativeStackNavigator();

const appOpenAdUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const App = () => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adShown, setAdShown] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const appOpenAdRef = useRef(null);

  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.buttonColor,
    },
    headerTintColor: colors.primaryLight,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  useEffect(() => {
    MobileAds()
      .initialize()
      .then(() => {
        const ad = AppOpenAd.createForAdRequest(appOpenAdUnitId);
        appOpenAdRef.current = ad;

        const loadedListener = ad.addAdEventListener(AdEventType.LOADED, () => {
          setAdLoaded(true);
        });

        ad.load();

        return () => {
          loadedListener();
        };
      });
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setAppReady(true);
    });
  }, []);

  useEffect(() => {
    if (appReady && adLoaded) {
      SplashScreen.hide();
      appOpenAdRef.current?.show();
      setAdShown(true);
    }
  }, [appReady, adLoaded]);

  if (!adShown) {
    return <View style={{ flex: 1, backgroundColor: 'white' }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='SignIn-Screen' component={SignIn} />
        <Stack.Screen name='SignUp-Screen' component={SignUp} />
        <Stack.Screen name='Home-Screen' component={HomeScreen} />
        <Stack.Screen name='Screen2' component={Screen2} />
        <Stack.Screen name='Screen3' component={Screen3} />
        <Stack.Screen name='Screen4' component={Screen4} />
        <Stack.Screen name='Screen5' component={Screen5} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;