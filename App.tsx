import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import KeyScreen from '@src/screens/key';
import MainScreen from '@src/screens/main';
import SettingScreen from '@src/screens/setting';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme } from '@src/styles/theme';
import { Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  const scheme = useColorScheme();

  console.log(scheme, colorScheme);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="ApiKey"
              component={KeyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Setting"
              component={SettingScreen}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
