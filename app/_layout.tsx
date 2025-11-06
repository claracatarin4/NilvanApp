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
      
      <Stack.Screen name="addprodutos/index" /> 
      
      {/* Se houver cadastros futuros (Estoque, Categoria) */}
      {/* <Stack.Screen name="AddStock/index" /> */}
      {/* <Stack.Screen name="AddCategory/index" /> */}
    </Stack>
  );
}