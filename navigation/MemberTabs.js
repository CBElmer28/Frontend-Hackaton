import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// Importaciones de las pantallas de Miembro de Mesa (asegúrate que los paths sean correctos)
import MemberInicioScreen from "../screens/MemberInicioScreen";
import MemberAsignacionScreen from "../screens/MemberAsignacionScreen";
import MemberCalendarioScreen from "../screens/MemberCalendarioScreen";
import MemberDeberesScreen from "../screens/MemberDeberesScreen";

// Paleta de colores institucional
const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    white: '#FFFFFF',
    gray: '#EEEEEE',
    dark: '#333333'
};

export default function MemberTabs() {
  // Estado para la pestaña activa, inicia en "Inicio"
  const [activeTab, setActiveTab] = useState("Inicio");

  // Mapeo de nombres de pestañas a sus respectivos componentes
  const screens = {
    "Inicio": <MemberInicioScreen />,
    "Asignación": <MemberAsignacionScreen />,
    "Calendario": <MemberCalendarioScreen />,
    "Deberes": <MemberDeberesScreen />,
  };

  return (
    <View style={styles.mainContainer}>
      
      {/* 1. Contenido de la Pantalla Activa */}
      {/* Muestra el componente correspondiente al activeTab */}
      <View style={{ flex: 1 }}>{screens[activeTab]}</View>
      
      {/* 2. Barra de Navegación Custom (en la parte inferior) */}
      <View style={styles.tabContainer}>
        {Object.keys(screens).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            {/* Ícono de Casa para Inicio, Mapa para Asignación, Calendario para Cronograma, Gavel para Deberes */}
            <Text style={activeTab === tab ? styles.activeText : styles.text}>
              {tab === "Inicio" ? "🏠" : 
               tab === "Asignación" ? "📍" : 
               tab === "Calendario" ? "🗓️" : 
               "🔨"} 
            </Text>
            <Text style={[activeTab === tab ? styles.activeText : styles.text, styles.labelText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.gray, 
  },
  tabContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    backgroundColor: colors.white, 
    borderTopWidth: 1, 
    borderTopColor: colors.gray,
    paddingVertical: 10,
    paddingBottom: 15, // Espacio para el 'notch' inferior
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8, // Sombra
  },
  tab: { 
    paddingHorizontal: 5, 
    paddingVertical: 4, 
    borderRadius: 25, 
    backgroundColor: 'transparent',
    alignItems: 'center',
    minWidth: 80,
  },
  activeTab: { 
    backgroundColor: colors.redPrimary, // Fondo rojo para la pestaña activa
  },
  text: { 
    color: colors.dark, 
    fontWeight: "500",
    fontSize: 20, // Tamaño del ícono/emoji
  },
  activeText: { 
    color: colors.white, 
    fontWeight: "bold",
    fontSize: 20,
  },
  labelText: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: 'normal',
    color: colors.dark,
  }
});