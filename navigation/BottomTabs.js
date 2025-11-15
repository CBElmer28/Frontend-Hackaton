import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FechasScreen from '../screens/FechasScreen';
import CandidatoScreen from '../screens/CandidatoScreen';
import DniScreen from '../screens/DniScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Fechas"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          if (route.name === "Fechas") iconName = focused ? "home" : "home-outline";
          if (route.name === "Candidatos") iconName = focused ? "people" : "people-outline";
          if (route.name === "DNI") iconName = focused ? "id-card" : "id-card-outline";

          return <Ionicons name={iconName} size={24} color={focused ? "#007BFF" : "gray"} />;
        },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Fechas" component={FechasScreen} />
      <Tab.Screen name="Candidatos" component={CandidatoScreen} />
      <Tab.Screen name="DNI" component={DniScreen} />
    </Tab.Navigator>
  );
}
