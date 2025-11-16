// src/navigation/MainTabs.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";

// --- Your Screens ---
import ElectorCandidatosScreen from "../screens/ElectorCandidatosScreen";
import HomeScreen from "../screens/HomeScreen";
import SharedCalendarioScreen from "../screens/SharedCalendarioScreen";
import SharedPartidosScreen from "../screens/SharedPartidosScreen";
import VerificarScreen from "../screens/VerificarScreen";

const screenWidth = Dimensions.get("window").width;

export default function MainTabs({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("Home");
  const scrollRef = useRef(null);

  const role = route?.params?.role ?? null;
  
  // If a specific tab is requested via route params, switch to it
  const requestedTab = route?.params?.activeTab;
  React.useEffect(() => {
    if (requestedTab && Object.keys(screens).includes(requestedTab)) {
      setActiveTab(requestedTab);
    }
  }, [requestedTab]);

  const colors = {
    redPrimary: "#D70000",
    blueSecondary: "#1C3E6C",
    white: "#FFFFFF",
    gray: "#EEEEEE",
    dark: "#333333",
  };

  const getTabIcon = (tab, isActive) => {
    const emojiMap = {
      Home: "🏠",
      Candidatos: "🔍",
      Calendarios: "🗓️",
      Partidos: "🏛️",
      Verificar: "✅",
      "Mi Voto": "🗳️",
      "Inicio Miembro": "👤",
      Asignación: "📋",
      "Calendario Miembro": "📆",
      Deberes: "🧭",
      "Cerrar Sesión": "🚪",
    };

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={[isActive ? styles.activeIcon : styles.icon]}>
          {emojiMap[tab] || "❓"}
        </Text>
        <Text
          style={[
            isActive ? styles.activeLabelText : styles.labelText,
            { color: isActive ? colors.white : colors.dark },
          ]}
        >
          {tab}
        </Text>
      </View>
    );
  };

  const screens = {
    Home: <HomeScreen navigation={navigation} onTabSwitch={setActiveTab} />,
    Candidatos: <ElectorCandidatosScreen />,
    Calendarios: <SharedCalendarioScreen />,
    Partidos: <SharedPartidosScreen />,
    Verificar: <VerificarScreen navigation={navigation} />,
  };

  if (role === "elector") {
    const ElectorInicioScreen = require("../screens/ElectorInicioScreen").default;
    screens["Mi Voto"] = <ElectorInicioScreen />;
    screens["Cerrar Sesión"] = <HomeScreen />;
  }

  if (role === "member") {
    const MemberInicioScreen = require("../screens/MemberInicioScreen").default;
    const MemberAsignacionScreen = require("../screens/MemberAsignacionScreen").default;
    const MemberCalendarioScreen = require("../screens/MemberCalendarioScreen").default;
    const MemberDeberesScreen = require("../screens/MemberDeberesScreen").default;

    screens["Inicio Miembro"] = <MemberInicioScreen />;
    screens["Asignación"] = <MemberAsignacionScreen />;
    screens["Calendario Miembro"] = <MemberCalendarioScreen />;
    screens["Deberes"] = <MemberDeberesScreen />;
    screens["Cerrar Sesión"] = <HomeScreen />;
  }

  const tabKeys = Object.keys(screens);
  const activeIndex = tabKeys.indexOf(activeTab);

  const handleScroll = (event) => {
  const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
  const nextTab = tabKeys[index];

  if (nextTab === "Cerrar Sesión") {
    // Evita actualizar el estado para no provocar doble render
    Alert.alert("Cerrar sesión", "¿Desea cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => scrollToTab(activeIndex), // vuelve al tab anterior
      },
      {
        text: "Sí",
        onPress: () => navigation.replace("MainTabs"),
      },
    ]);
  } else {
    // Solo actualiza si no es "Cerrar Sesión"
    if (nextTab !== activeTab) {
      setActiveTab(nextTab);
    }
  }
};

  const scrollToTab = (index) => {
    scrollRef.current?.scrollTo({ x: index * screenWidth, animated: true });
    setActiveTab(tabKeys[index]);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable screens */}
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={styles.screenWrapper}
      >
        {tabKeys.map((key) => (
          <View key={key} style={{ width: screenWidth }}>
            {screens[key]}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          {tabKeys.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && { backgroundColor: colors.redPrimary },
              ]}
              onPress={() => {
                if (tab === "Cerrar Sesión") {
                  Alert.alert("Cerrar sesión", "¿Desea cerrar sesión?", [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Sí", onPress: () => navigation.replace("MainTabs") },
                  ]);
                  return;
                }
                scrollToTab(index);
              }}
            >
              {getTabIcon(tab, activeTab === tab)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  screenWrapper: { flex: 1 },
  tabContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  tabScroll: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  icon: { fontSize: 20 },
  activeIcon: { fontSize: 22 },
  labelText: { fontSize: 12 },
  activeLabelText: { fontSize: 12, fontWeight: "bold" },
});