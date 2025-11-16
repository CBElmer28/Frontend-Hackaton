import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CandidatosScreen from "../screens/CandidatoScreen";
import DniScreen from "../screens/DniScreen";

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      swipeEnabled={true}
      screenOptions={({ route }) => ({
        tabBarShowIcon: true,
        tabBarIndicatorStyle: { backgroundColor: "#007BFF", height: 3 },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 70,
          borderTopWidth: 1,
          borderTopColor: "#eee",
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontSize: 12, color: focused ? "#007BFF" : "#888", top: focused ? -4 : 0 }}>
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Candidatos") iconName = "people";
          else if (route.name === "Validación") iconName = "id-card";

          return (
            <View style={{ top: focused ? -6 : 0 }}>
              <Ionicons name={iconName} size={24} color={focused ? "#007BFF" : "#888"} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Candidatos" component={CandidatosScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Validación" component={DniScreen} />
    </Tab.Navigator>
  );
}