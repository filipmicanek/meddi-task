import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Weather from '../screens/Weather';
import CameraScreen from '../screens/Camera';
import { colors } from '../theme/colors';

export type RootTabParamList = {
  Camera: undefined;
  Profile: undefined;
  Weather: { name?: string };
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.customTabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        let icon;
        switch (route.name) {
          case 'Camera': {
            icon = (
              <MaterialCommunityIcons
                name={isFocused ? 'camera' : 'camera-outline'}
                size={24}
              />
            );
            break;
          }
          case 'Profile': {
            icon = (
              <MaterialIcons
                name={isFocused ? 'person' : 'person-outline'}
                size={24}
              />
            );
            break;
          }
          case 'Weather': {
            icon = (
              <MaterialCommunityIcons
                name={isFocused ? 'cloud' : 'cloud-outline'}
                size={24}
              />
            );
            break;
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            hitSlop={30}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Tabs() {
  return (
    <Tab.Navigator
      tabBar={CustomTabBar}
      screenOptions={() => ({
        headerShadowVisible: false,
        tabBarActiveTintColor: '#14112a',
        tabBarInactiveTintColor: '#aaa',
      })}
    >
      <Tab.Screen
        options={{
          title: '',
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{
          title: 'Kamera',
        }}
        name="Camera"
        component={CameraScreen}
      />
      <Tab.Screen
        options={{
          title: 'Počasí',
        }}
        name="Weather"
        component={Weather}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  customTabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
