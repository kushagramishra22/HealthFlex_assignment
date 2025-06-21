import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import { TimerProvider } from './context/TimerContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer theme={DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName = route.name === 'Timers' ? 'timer-outline' : 'time-outline';
              return <Ionicons name={iconName} size={18} color={color} style={{ marginRight: 4 }} />;
            },
            tabBarShowIcon: true,
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: '#1e90ff' },
            tabBarActiveTintColor: '#1e90ff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: 'white', elevation: 2 },
          })}
        >
          <Tab.Screen name="Timers" component={HomeScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}