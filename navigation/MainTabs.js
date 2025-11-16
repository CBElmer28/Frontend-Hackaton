// src/navigation/MainTabs.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";

// --- Your Screens ---
import ElectorCandidatosScreen from "../screens/ElectorCandidatosScreen";
import HomeScreen from "../screens/HomeScreen";
import SharedCalendarioScreen from "../screens/SharedCalendarioScreen";
import SharedPartidosScreen from "../screens/SharedPartidosScreen";
import VerificarScreen from "../screens/VerificarScreen";

export default function MainTabs({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("Home");

  // role can be 'elector', 'member' or undefined
  const role = route?.params?.role ?? null;

  const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    white: '#FFFFFF',
    gray: '#EEEEEE',
    dark: '#333333'
  };

  const getTabIcon = (tab, isActive) => {
    let emoji = '';
    switch (tab) {
      case 'Home':
        emoji = '🏠';
        break;
      case 'Candidatos':
        emoji = '🔍';
        break;
      case 'Calendarios':
        emoji = '🗓️';
        break;
      case 'Partidos':
        emoji = '🏛️';
        break;
      case 'Verificar':
        emoji = '✅';
        break;
      default:
        emoji = '❓';
    }

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[isActive ? styles.activeIcon : styles.icon]}>{emoji}</Text>
        <Text style={[isActive ? styles.activeLabelText : styles.labelText, { color: isActive ? colors.white : colors.dark }]}>{tab}</Text>
      </View>
    );
  };

  // Base screens visible to everyone
  const screens = {
    Home: <HomeScreen />,
    Candidatos: <ElectorCandidatosScreen />,
    Calendarios: <SharedCalendarioScreen />,
    Partidos: <SharedPartidosScreen/>,
    Verificar: <VerificarScreen navigation={navigation} />
  };

  // Add elector-specific screens when role is 'elector'
  if (role === 'elector') {
    // lazy-import elector home screen component to avoid duplicate imports elsewhere
    const ElectorInicioScreen = require('../screens/ElectorInicioScreen').default;
    screens['Mi Voto'] = <ElectorInicioScreen />;
    // keep existing Candidatos/Calendarios/Partidos already present
    screens['Cerrar Sesión'] = <HomeScreen />;
  }

  // Add member-specific screens when role is 'member'
  if (role === 'member') {
    const MemberInicioScreen = require('../screens/MemberInicioScreen').default;
    const MemberAsignacionScreen = require('../screens/MemberAsignacionScreen').default;
    const MemberCalendarioScreen = require('../screens/MemberCalendarioScreen').default;
    const MemberDeberesScreen = require('../screens/MemberDeberesScreen').default;

    screens['Inicio Miembro'] = <MemberInicioScreen />;
    screens['Asignación'] = <MemberAsignacionScreen />;
    screens['Calendario Miembro'] = <MemberCalendarioScreen />;
    screens['Deberes'] = <MemberDeberesScreen />;
    screens['Cerrar Sesión'] = <HomeScreen />;
  }

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
                activeTab === tab && { backgroundColor: colors.redPrimary }
              ]}
              onPress={() => {
                if (tab === 'Cerrar Sesión') {
                  // Confirm logout
                  Alert.alert('Cerrar sesión', '¿Desea cerrar sesión?', [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Sí', onPress: () => navigation.replace('MainTabs') }
                  ]);
                  return;
                }
                setActiveTab(tab);
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
    backgroundColor: "#ffffffff",
  },

  tabScroll: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#ffffffff",
    marginHorizontal: 5,
  },

  activeTabButton: { backgroundColor: "#007aff" },

  tabText: { fontSize: 16, color: "#333" },

  activeTabText: { color: "#fff", fontWeight: "600" },
});
