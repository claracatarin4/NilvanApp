import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
// const Stack = createStackNavigator();
export default function RootLayout() {
  return (
   <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="auth/Login/index"
    >
      <Stack.Screen name="auth/Login/index"/>
      {/* <Stack.Screen name="Home"/>
      <Stack.Screen name="ProductList"/>
      <Stack.Screen name="AddProduct"/> */}
    </Stack.Navigator>
  )
}
