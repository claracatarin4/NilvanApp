import { Stack } from "expo-router";
import React, { JSX } from "react";

export default function RootLayout(): JSX.Element {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="auth/Login/index" /> 
      
      <Stack.Screen name="(tabs)" /> 

      <Stack.Screen name="auth/Register/index"/>
      
      <Stack.Screen name="addprodutos/index" /> 

      <Stack.Screen name="pesquisa/index"/>
      
      <Stack.Screen name="verproduto/index"/> 
      
    </Stack>
  );
}