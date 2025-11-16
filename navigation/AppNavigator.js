import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import MainTabs from "./MainTabs";
import VerificarScreen from "../screens/VerificarScreen";
import CandidatoDetalleScreen from "../screens/CandidatoDetalleScreen";
import PartidoDetalleScreen from "../screens/PartidoDetalleScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="VerificarScreen" component={VerificarScreen} />
        <Stack.Screen name="CandidatoDetalle" component={CandidatoDetalleScreen} />
        <Stack.Screen name="PartidoDetalle" component={PartidoDetalleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}