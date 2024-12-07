import * as React from 'react';
import { Provider as ThemeProvider } from '@draftbit/ui';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import {
  ActivityIndicator,
  AppState,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigator from './AppNavigator';
import Fonts from './config/Fonts.js';
import { GlobalVariableProvider } from './config/GlobalVariableContext';
import cacheAssetsAsync from './config/cacheAssetsAsync';
import Draftbit from './themes/Draftbit';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient();

const App = () => {
  const [areAssetsCached, setAreAssetsCached] = React.useState(false);

  const [fontsLoaded] = useFonts({
    ADLaMDisplay_400Regular: Fonts.ADLaMDisplay_400Regular,
    AROneSans_500Medium: Fonts.AROneSans_500Medium,
    AROneSans_600SemiBold: Fonts.AROneSans_600SemiBold,
    Inter_400Regular: Fonts.Inter_400Regular,
    Inter_300Light: Fonts.Inter_300Light,
    Inter_500Medium: Fonts.Inter_500Medium,
    Inter_600SemiBold: Fonts.Inter_600SemiBold,
    Inter_800ExtraBold: Fonts.Inter_800ExtraBold,
    Inter_700Bold: Fonts.Inter_700Bold,
    Inter_200ExtraLight: Fonts.Inter_200ExtraLight,
    NunitoSans_700Bold: Fonts.NunitoSans_700Bold,
    NunitoSans_500Medium: Fonts.NunitoSans_500Medium,
    NunitoSans_600SemiBold: Fonts.NunitoSans_600SemiBold,
    NunitoSans_400Regular: Fonts.NunitoSans_400Regular,
    Poppins_400Regular: Fonts.Poppins_400Regular,
    Poppins_500Medium: Fonts.Poppins_500Medium,
    Poppins_700Bold: Fonts.Poppins_700Bold,
    Urbanist_400Regular: Fonts.Urbanist_400Regular,
    Urbanist_600SemiBold: Fonts.Urbanist_600SemiBold,
    Urbanist_700Bold: Fonts.Urbanist_700Bold,
  });

  React.useEffect(() => {
    async function prepare() {
      try {
        await cacheAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAreAssetsCached(true);
      }
    }

    prepare();
  }, []);

  const isReady = areAssetsCached && fontsLoaded;
  const onLayoutRootView = React.useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            themes={[Draftbit]}
            breakpoints={{}}
            initialThemeName={'Draftbit'}
          >
            <AppNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
  );
};

export default App;
