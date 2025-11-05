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
      <Stack.Screen name="(tabs)/home/index" /> 
      <Stack.Screen name="(tabs)/produtos/index" /> 
    </Stack>
  );
}