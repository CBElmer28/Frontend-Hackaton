import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import MainTabs from "./MainTabs";  // Aquí está tu menú

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* 1. Pantalla inicial */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* 2. Menú principal con tabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
