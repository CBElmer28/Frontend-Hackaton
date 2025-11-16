// src/navigation/MainTabs.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// --- Your Screens ---
import ElectorCandidatosScreen from "../screens/ElectorCandidatosScreen";
import HomeScreen from "../screens/HomeScreen";
import SharedCalendarioScreen from "../screens/SharedCalendarioScreen";
import SharedPartidosScreen from "../screens/SharedPartidosScreen";
import VerificarScreen from "../screens/VerificarScreen";

const screenWidth = Dimensions.get("window").width;

export default function MainTabs({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("Inicio");
  const scrollRef = useRef(null);

  const role = route?.params?.role ?? null;
  const datos = route?.params?.datos ?? null;

  const colors = {
    redPrimary: "#D70000",
    blueSecondary: "#1C3E6C",
    white: "#FFFFFF",
    gray: "#EEEEEE",
    dark: "#333333",
  };

  const getTabIcon = (tab, isActive) => {
    const iconMap = {
      Inicio: "home",
      Candidatos: "search",
      Calendarios: "calendar",
      Partidos: "business",
      Verificar: "checkmark-circle",
      "Mi Voto": "ballot",
      "Inicio Miembro": "person",
      Asignación: "clipboard",
      "Calendario Miembro": "calendar-outline",
      Deberes: "compass",
      "Cerrar Sesión": "log-out",
    };

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Ionicons
          name={iconMap[tab] || "help-circle"}
          size={22}
          color={isActive ? colors.white : colors.dark}
        />
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
    Inicio: (
      <HomeScreen
        navigation={navigation}
        onTabSwitch={(tabName) => {
          const index = tabKeys.indexOf(tabName);
          if (index !== -1) scrollToTab(index);
        }}
      />
    ),
  };

  if (role === "elector") {
    const ElectorInicioScreen = require("../screens/ElectorInicioScreen").default;
    screens["Mi Voto"] = <ElectorInicioScreen />;
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
  }

  const allScreens = {
    ...screens,
    Candidatos: <ElectorCandidatosScreen />,
    Calendarios: <SharedCalendarioScreen />,
    Partidos: <SharedPartidosScreen />,
    Verificar: <VerificarScreen navigation={navigation} />,
  };

  const allKeys = Object.keys(allScreens);
  const activeIndex = allKeys.indexOf(activeTab);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    const nextTab = allKeys[index];

    if (nextTab === "Cerrar Sesión") {
      Alert.alert("Cerrar sesión", "¿Desea cerrar sesión?", [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => scrollToTab(activeIndex),
        },
        {
          text: "Sí",
          onPress: () => navigation.replace("MainTabs"),
        },
      ]);
    } else {
      if (nextTab !== activeTab) {
        setActiveTab(nextTab);
      }
    }
  };

  const scrollToTab = (index) => {
    scrollRef.current?.scrollTo({ x: index * screenWidth, animated: true });
    setActiveTab(allKeys[index]);
  };

  useEffect(() => {
    const requestedTab = route?.params?.activeTab;
    if (requestedTab && allKeys.includes(requestedTab)) {
      const idx = allKeys.indexOf(requestedTab);
      scrollToTab(idx);
    } else if (!datos) {
      const idx = allKeys.indexOf("Inicio");
      if (idx !== -1) scrollToTab(idx);
    }
  }, [route?.params?.activeTab]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={styles.screenWrapper}
      >
        {allKeys.map((key) => (
          <View key={key} style={{ width: screenWidth }}>
            {allScreens[key]}
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          {(() => {
            const hiddenInBottom = ["Candidatos", "Calendarios", "Partidos", "Verificar"];
            const bottomKeys = allKeys.filter((k) => !hiddenInBottom.includes(k));
            return bottomKeys.map((tab) => {
              const idx = allKeys.indexOf(tab);
              return (
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
                    if (idx !== -1) scrollToTab(idx);
                  }}
                >
                  {getTabIcon(tab, activeTab === tab)}
                </TouchableOpacity>
              );
            });
          })()}
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
  labelText: { fontSize: 12 },
  activeLabelText: { fontSize: 12, fontWeight: "bold" },
});