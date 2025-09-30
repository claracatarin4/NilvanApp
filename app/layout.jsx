import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './index';

import Stock from './stock';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Products') {
              iconName = focused ? 'cube' : 'cube-outline';
            } else if (route.name === 'Stock') {
              iconName = focused ? 'bag' : 'bag-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1e3a5f',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen 
          name="Stock" 
          component={Stock}
          options={{ tabBarLabel: 'Estoque' }}
        />
    
      </Tab.Navigator>
    </NavigationContainer>
  );
}