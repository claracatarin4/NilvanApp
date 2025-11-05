import { Tabs } from "expo-router";
import { Text } from "react-native";
// Importe os ícones diretamente do 'lucide-react-native'
import { Home, Package } from 'lucide-react-native'; 

// O componente Lucide já aceita props como color e size
function TabBarIcon({ name, focused, color, size = 28 }) {
  // Vamos mapear os nomes lógicos para os componentes Lucide
  const iconComponents = {
    home: Home,      // Ícone de casa para Home
    produtos: Package, // Ícone de pacote para Produtos
  };

  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    return <Text style={{ fontSize: size, opacity: focused ? 1 : 0.6 }}>•</Text>;
  }

  // O componente Lucide já tem seu próprio estilo, 
  // mas podemos adicionar a opacidade para o efeito de foco.
  return (
    <IconComponent 
      color={color} // A cor é recebida do tabBarActiveTintColor/tabBarInactiveTintColor
      size={size} 
      style={{ opacity: focused ? 1 : 0.7 }}
      // As props 'strokeWidth' e 'fill' também podem ser usadas no Lucide!
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
        // Cores ativas e inativas são essenciais para os ícones Lucide
        tabBarActiveTintColor: "#1a2b5c",
        tabBarInactiveTintColor: "#999",
      }}
    >
      
      <Tabs.Screen
        name="Home/index"
        options={{
          // Passamos a cor e o foco para o TabBarIcon
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