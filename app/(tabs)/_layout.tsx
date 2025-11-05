import { Tabs } from "expo-router";
import { Text, ViewStyle, TextStyle } from "react-native";
import { Home, Package } from 'lucide-react-native'; 
import React, { JSX } from "react"; 

const iconComponents = {
  home: Home,
  produtos: Package,
} as const;

interface TabBarIconProps {
  name: keyof typeof iconComponents; 
  focused: boolean;
  color: string;
  size?: number; 
}

function TabBarIcon({ name, focused, color, size = 28 }: TabBarIconProps): JSX.Element {

  const IconComponent = iconComponents[name]; 

  if (!IconComponent) {
    const fallbackStyle: TextStyle = { fontSize: size, opacity: focused ? 1 : 0.6 };
    return <Text style={fallbackStyle}>•</Text>;
  }

  return (
    <IconComponent 
      color={color} 
      size={size} 
      style={{ opacity: focused ? 1 : 0.7 }}
    />
  );
}

export default function TabsLayout(): JSX.Element {
  const customTabBarStyle: ViewStyle = {
    backgroundColor: "#fff",
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: customTabBarStyle,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1a2b5c",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="Home/index"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon name="home" focused={focused} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="produtos" 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon name="produtos" focused={focused} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}