import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
// Importamos el componente Icon de Ionicons (para proyectos Expo)
import { Ionicons } from "@expo/vector-icons"; 
import LogoutButton from "../components/LogoutButton";

// Color Palette
const colors = {
  redPrimary: "#D70000",
  blueSecondary: "#1C3E6C",
  white: "#FFFFFF",
  gray: "#EEEEEE",
  dark: "#333333",
  green: "#4CAF50",
};

export default function HomeScreen({ navigation, onTabSwitch }) {
  // Sample data for upcoming dates (TRADUCIDO)
  const upcomingDates = [
    { date: "19 Nov, 2025", event: "Inicio de Votación Anticipada" },
    { date: "22 Nov, 2025", event: "Último Día para Registrarse" },
    { date: "25 Nov, 2025", event: "Día de Elecciones" },
    { date: "02 Dic, 2025", event: "Certificación de Resultados" },
  ];

  // Sample data for alerts (TRADUCIDO Y CON ICONOS DE IONICONS)
  const alerts = [
    {
      id: 1,
      type: "warning",
      iconName: "warning", // Ionicons para advertencia
      title: "Reglas de Registro Actualizadas",
      description:
        "Nuevos requisitos de documentación efectivos a partir del 20 de Nov, 2025.",
      color: colors.redPrimary,
    },
    {
      id: 2,
      type: "info",
      iconName: "information-circle", // Ionicons para información
      title: "Accesibilidad de Voto",
      description:
        "Todos los centros de votación son totalmente accesibles. Conozca nuestros ajustes.",
      color: colors.blueSecondary,
    },
  ];

  // Quick access tiles with navigation handlers (TRADUCIDO Y CON ICONOS DE IONICONS)
  const quickAccessTiles = [
    {
      id: 1,
      iconName: "people", // Candidatos
      label: "Candidatos",
      action: () => {
        if (onTabSwitch) {
          onTabSwitch("Candidatos");
        }
      },
    },
    {
      id: 2,
      iconName: "business", // Partidos/Institución
      label: "Partidos",
      action: () => {
        if (onTabSwitch) {
          onTabSwitch("Partidos");
        }
      },
    },
    {
      id: 3,
      iconName: "calendar", // Calendario
      label: "Calendario",
      action: () => {
        if (onTabSwitch) {
          onTabSwitch("Calendarios");
        }
      },
    },
    {
      id: 4,
      iconName: "help-circle", // FAQ
      label: "FAQ",
      action: () => {
        Alert.alert("FAQ", "Sección de Preguntas Frecuentes - ¡próximamente!");
      },
    },
  ];

  const handleVerifyPress = () => {
    if (navigation) {
      navigation.navigate("VerificarScreen");
    }
  };

  const handleQuickAccessPress = (tabName) => {
    if (!onTabSwitch) {
      Alert.alert("Error", "La navegación por pestañas no está disponible");
      return;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LogoutButton navigation={navigation} />
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header Section (TRADUCIDO) */}
      <View style={styles.headerSection}>
        <Text style={styles.appTitle}>📱 CivilTech</Text>
        <Text style={styles.appTagline}>Plataforma de Información Electoral</Text>
      </View>

      {/* Welcome Card (TRADUCIDO y CON ICONO AJUSTADO) */}
      <View style={styles.welcomeCard}>
        {/* Icono: Balanza/Justicia (Ionicons) */}
        <Ionicons name="scale" size={40} color={colors.blueSecondary} style={styles.welcomeIcon} />
        <Text style={styles.welcomeTitle}>¡Bienvenido a CivilTech!</Text>
        <Text style={styles.welcomeSubtitle}>
          Tu guía electoral de confianza
        </Text>
      </View>

      {/* Verify Identity Card - Primary CTA (TRADUCIDO y CON ICONO AJUSTADO) */}
      <View style={styles.verifyCard}>
        {/* Icono: Candado (Ionicons) */}
        <Ionicons name="lock-closed" size={44} color={colors.dark} style={styles.verifyIcon} />
        <Text style={styles.verifyTitle}>VERIFICA TU IDENTIDAD</Text>
        <Text style={styles.verifyDescription}>
          Obtén acceso a los detalles de tu voto, lugar de votación y más.
        </Text>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerifyPress}
        >
          <Text style={styles.verifyButtonText}>Verificar Ahora</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Access Section (TRADUCIDO) */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Acceso Rápido</Text>
        <View style={styles.tilesGrid}>
          {quickAccessTiles.map((tile) => (
            <TouchableOpacity
              key={tile.id}
              style={styles.tile}
              onPress={tile.action}
            >
              {/* Usando Icono de Ionicons */}
              <Ionicons name={tile.iconName} size={32} color={colors.blueSecondary} style={styles.tileIcon} />
              <Text style={styles.tileLabel}>{tile.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upcoming Dates Section (TRADUCIDO y CON ICONO AJUSTADO) */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Próximas Fechas Electorales</Text>
        <View style={styles.datesList}>
          {upcomingDates.map((item, index) => (
            <View key={index} style={styles.dateCard}>
              {/* Icono: Calendario */}
              <Ionicons name="calendar-sharp" size={20} color={colors.dark} style={styles.dateIcon} />
              <View style={styles.dateContent}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dateEvent}>{item.event}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* News & Alerts Section (TRADUCIDO) */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Noticias y Alertas Importantes</Text>
        <View style={styles.alertsList}>
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <View
                style={[styles.alertAccent, { backgroundColor: alert.color }]}
              />
              <View style={styles.alertContent}>
                {/* Usando Icono de Ionicons */}
                <Ionicons name={alert.iconName} size={20} color={alert.color} style={styles.alertIcon} />
                <View style={styles.alertTextContainer}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertDescription}>
                    {alert.description}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.alertLink}>→</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Spacer for bottom nav */}
      <View style={styles.spacer} />
    </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Header Section
  headerSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.gray,
    alignItems: "center",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.blueSecondary,
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 14,
    color: colors.dark,
  },

  // Welcome Card
  welcomeCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  welcomeIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.dark,
  },

  // Verify Card - Primary CTA
  verifyCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.redPrimary,
    elevation: 3,
    shadowColor: colors.redPrimary,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  verifyIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  verifyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.redPrimary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  verifyDescription: {
    fontSize: 13,
    color: colors.dark,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  verifyButton: {
    backgroundColor: colors.redPrimary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 8,
  },
  verifyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Section Container
  sectionContainer: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },

  // Quick Access Tiles
  tilesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: "48%",
    aspectRatio: 1.1,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  tileIcon: {
    marginBottom: 8,
  },
  tileLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.dark,
    textAlign: "center",
  },

  // Upcoming Dates
  datesList: {
    flexDirection: "column",
  },
  dateCard: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: colors.gray,
    borderRadius: 8,
    alignItems: "center",
  },
  dateIcon: {
    marginRight: 12,
  },
  dateContent: {
    flex: 1,
  },
  dateText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 2,
  },
  dateEvent: {
    fontSize: 12,
    color: colors.dark,
    opacity: 0.7,
  },

  // News & Alerts
  alertsList: {
    flexDirection: "column",
  },
  alertCard: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: colors.gray,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  alertAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  alertContent: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 12,
  },
  alertIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 12,
    color: colors.dark,
    opacity: 0.7,
    lineHeight: 18,
  },
  alertLink: {
    fontSize: 18,
    color: colors.blueSecondary,
    marginLeft: 8,
  },

  // Spacer
  spacer: {
    height: 20,
  },
});