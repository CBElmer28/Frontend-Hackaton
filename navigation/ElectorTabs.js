import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// Importaciones de pantallas para el Rol Votante
import ElectorInicioScreen from "../screens/ElectorInicioScreen"; // Panel Personalizado (Mi Voto)
import ElectorCandidatosScreen from "../screens/ElectorCandidatosScreen"; // Búsqueda por Cargo (Filtros)
import SharedCalendarioScreen from "../screens/SharedCalendarioScreen"; // Calendario (Compartido)
import SharedPartidosScreen from "../screens/SharedPartidosScreen"; // Partidos (Lista Presidencial)

// Paleta de colores institucional
const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    white: '#FFFFFF',
    gray: '#EEEEEE',
    dark: '#333333'
};

// Función utilitaria para mapear el ícono
const getTabIcon = (tab, isActive) => {
    let emoji = "";
    switch (tab) {
        case "Mi Voto":
            emoji = "🗳️";
            break;
        case "Candidatos":
            emoji = "🔍";
            break;
        case "Partidos":
            emoji = "🏛️";
            break;
        case "Calendario":
            emoji = "🗓️";
            break;
        default:
            emoji = "❓";
    }
    
    const style = isActive ? styles.activeText : styles.text;

    return (
        <View style={styles.iconWrapper}>
            <Text style={style}>{emoji}</Text>
            <Text style={[isActive ? styles.activeLabelText : styles.labelText, { color: isActive ? colors.white : colors.dark }]}>
                {tab}
            </Text>
        </View>
    );
};

export default function ElectorTabs() {
  // Estado para la pestaña activa, inicia en "Mi Voto"
  const [activeTab, setActiveTab] = useState("Mi Voto");

  const screens = {
    // NUEVA ESTRUCTURA DE PESTAÑAS PARA EL VOTANTE
    "Mi Voto": <ElectorInicioScreen />, // Panel personalizado (Ubicación, horario)
    "Candidatos": <ElectorCandidatosScreen />, // Búsqueda avanzada por cargo con filtros
    "Partidos": <SharedPartidosScreen />, // Lista de Planchas Presidenciales y planes
    "Calendario": <SharedCalendarioScreen />, // Fechas importantes
  };

  return (
    <View style={styles.mainContainer}>
      
      {/* 1. Contenido de la Pantalla Activa */}
      <View style={{ flex: 1 }}>{screens[activeTab]}</View>
      
      {/* 2. Barra de Navegación Custom (en la parte inferior) */}
      <View style={styles.tabContainer}>
        {Object.keys(screens).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            {getTabIcon(tab, activeTab === tab)}
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
    paddingVertical: 8,
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
    minWidth: 75,
  },
  activeTab: { 
    backgroundColor: colors.redPrimary, // Fondo rojo para la pestaña activa
  },
  iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 2,
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
    fontSize: 10,
    marginTop: 2,
    fontWeight: 'normal',
    color: colors.dark,
  },
  activeLabelText: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: 'bold',
    color: colors.white,
  }
});