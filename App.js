import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import RecordScreen from './src/screens/RecordScreen';
import MapScreen from './src/screens/MapScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === '首页') iconName = 'home';
            else if (route.name === '记录') iconName = 'add-circle';
            else if (route.name === '地图') iconName = 'map';
            else if (route.name === '分析') iconName = 'analytics';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="首页" component={HomeScreen} />
        <Tab.Screen name="记录" component={RecordScreen} />
        <Tab.Screen name="地图" component={MapScreen} />
        <Tab.Screen name="分析" component={AnalysisScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}