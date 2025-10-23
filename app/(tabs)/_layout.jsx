import { Tabs } from "expo-router";
import { Text } from "react-native";

function TabBarIcon({ name, focused }) {

  const icons = {
    home: "🏠",           
    produtos: "📦",        
    vendas: "💰",         
    relatorios: "📊",     
    configuracoes: "⚙️",  
  };

 
  return <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.6 }}>{icons[name] || "•"}</Text>;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // O Stack interno de cada aba pode ter seu próprio cabeçalho
        tabBarStyle: {
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
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1a2b5c",
        tabBarInactiveTintColor: "#999",
      }}
    >

      <Tabs.Screen
        name="home" 
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} />,
        }}
      />

   
      <Tabs.Screen
        name="produtos" 
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="produtos" focused={focused} />,
        }}
      />
     
      <Tabs.Screen
        name="vendas" 
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="vendas" focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="relatorios" 
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="relatorios" focused={focused} />,
        }}
      />

     
      <Tabs.Screen
        name="configuracoes" 
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="configuracoes" focused={focused} />,
        }}
      />
      
    
    </Tabs>
  );
}