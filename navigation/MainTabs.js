// src/navigation/MainTabs.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

// --- Your Screens ---
import CandidatoScreen from "../screens/CandidatoScreen";
import HomeScreen from "../screens/HomeScreen";
import FechasScreen from "../screens/FechasScreen";
import NoticiasScreen from "../screens/NoticiasScreen";
import VerificarScreen from "../screens/VerificarScreen";

export default function MainTabs() {
  const [activeTab, setActiveTab] = useState("Home");

  const screens = {
    Home: <HomeScreen />,
    Profile: <CandidatoScreen />,
    Settings: <FechasScreen />,
    Noticias: <NoticiasScreen/>,
    Verificar: <VerificarScreen/>
    
  };

  return (
    <View style={styles.container}>
      {/* Render selected screen */}
      <View style={styles.screenWrapper}>{screens[activeTab]}</View>

      {/* Bottom Scrollable Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          {Object.keys(screens).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
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
    backgroundColor: "#f9f9f9",
  },

  tabScroll: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e5e5e5",
    marginHorizontal: 5,
  },

  activeTabButton: { backgroundColor: "#007aff" },

  tabText: { fontSize: 16, color: "#333" },

  activeTabText: { color: "#fff", fontWeight: "600" },
});
