import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Auth, { RootStackParamList } from './src/navigation/Auth';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootTabParamList } from './src/navigation/Tabs';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, RootTabParamList {}
  }
}

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Auth />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
