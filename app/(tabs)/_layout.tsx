import { Tabs } from "expo-router";
import { Home, Package, Users } from 'lucide-react-native';
import { COLORS } from '../../src/shared/constants/colors'; 
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native'; 


export default function TabsLayout() {
  
  const ActivePillBackground: ViewStyle = {
    width: 50,
    height: 50,  
    backgroundColor: '#D3D3D3', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center',
   
  };
  
  const InactivePill: ViewStyle = {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  };


  return (

    <Tabs
      safeAreaInsets={{ 
        bottom: 0, 
      }}
      
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, 

        tabBarActiveTintColor: COLORS.primary, 
        tabBarInactiveTintColor: COLORS.textLight, 
        
        tabBarStyle: {
            position: 'absolute', 
            backgroundColor: '#EEEEEE', 
            width: 200, 
            marginHorizontal: "24%",
            right: undefined, 
            alignItems:'center',
            paddingRight:16,
            paddingTop:16,
            paddingLeft:16,
            paddingBottom:16,
            bottom: 30,         
            height: 70,
            borderRadius: 8, 
            borderTopWidth: 0,
            justifyContent: 'center', 
            paddingHorizontal: 20, 
            elevation: 0
      
        },
        
        tabBarItemStyle: {
             flex: 1, 
             width: undefined, 
             alignItems: 'center', 
             justifyContent: 'center',
        },

        tabBarBackground: undefined, 
      }}
    >
      <Tabs.Screen 
        name="home/index" 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? ActivePillBackground : InactivePill}>
                <Home color={color} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="produtos/index" 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? ActivePillBackground : InactivePill}>
                <Package color={color} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="usuarios/index" 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? ActivePillBackground : InactivePill}>
                <Users color={color} size={30} />
            </View>
          ),
        }}
      />
      
    </Tabs>
      );
}