import { useAuth } from '@/features/shared/store/use-auth';
import { useTheme } from '@/features/shared/store/useTheme';
import '@/global.css'; // Ensure global styles are imported
import { useColorScheme } from '@/hooks/useColorScheme';
import NetInfo from '@react-native-community/netinfo';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Toaster } from 'sonner-native';
const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme((state) => state.theme);
  const { user } = useAuth();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PublicSansBold: require('../assets/fonts/PublicSans-Bold.ttf'),
    PublicSansMedium: require('../assets/fonts/PublicSans-Medium.ttf'),
    PublicSansRegular: require('../assets/fonts/PublicSans-Regular.ttf'),
  });
  useEffect(() => {
    Appearance.setColorScheme(theme);
  }, [theme]);
  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        console.log(error);
      }
    }
    void onFetchUpdateAsync();
  }, []);
  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  const isLoggedIn = !!user;
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen
                name="(protected)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="(public)" options={{ headerShown: false }} />
            </Stack.Protected>
          </Stack>
          <Toaster position="top-center" />
        </GestureHandlerRootView>
      </QueryClientProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
