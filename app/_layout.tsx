import { Stack } from "expo-router";
import React, { JSX } from "react";

export default function RootLayout(): JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Tela de login */}
      <Stack.Screen name="auth/Login/index" />

      {/* Layout de tabs DINÂMICO (permissionamento está em app/(tabs)/_layout.tsx) */}
      <Stack.Screen name="(tabs)" />

      {/* Tela de cadastro */}
      <Stack.Screen name="auth/Register/index" />

      {/* Telas fora das tabs */}
      <Stack.Screen name="addprodutos/index" />
      <Stack.Screen name="pesquisa/index" />
      <Stack.Screen name="verproduto/index" />
    </Stack>
  );
  
}