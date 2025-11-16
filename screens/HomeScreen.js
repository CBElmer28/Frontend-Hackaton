import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
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
  // Sample data for upcoming dates
  const upcomingDates = [
    { date: "Nov 19, 2025", event: "Early Voting Begins" },
    { date: "Nov 22, 2025", event: "Last Day to Register" },
    { date: "Nov 25, 2025", event: "Election Day" },
    { date: "Dec 02, 2025", event: "Results Certification" },
  ];

  // Sample data for alerts
  const alerts = [
    {
      id: 1,
      type: "warning",
      icon: "⚠️",
      title: "Updated Registration Rules",
      description:
        "New documentation requirements effective Nov 20, 2025.",
      color: colors.redPrimary,
    },
    {
      id: 2,
      type: "info",
      icon: "ℹ️",
      title: "Voting Accessibility",
      description:
        "All polling locations are fully accessible. Learn about our accommodations.",
      color: colors.blueSecondary,
    },
  ];

  // Quick access tiles with navigation handlers
  const quickAccessTiles = [
    {
      id: 1,
      emoji: "🔍",
      label: "Candidates",
      action: () => {
        if (onTabSwitch) {
          onTabSwitch("Candidatos");
        }
      },
    },
    {
      id: 2,
      emoji: "🏛️",
      label: "Parties",
      action: () => {
        if (onTabSwitch) {
          onTabSwitch("Partidos");
        }
      },
    },
    {
      id: 3,
      emoji: "🗓️",
      label: "Calendar",
      action: () => {
        if (onTabSwitch) {
          onTabSwitch("Calendarios");
        }
      },
    },
    {
      id: 4,
      emoji: "❓",
      label: "FAQ",
      action: () => {
        Alert.alert("FAQ", "FAQ section - coming soon!");
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
      Alert.alert("Error", "Tab switching not available");
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
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.appTitle}>📱 CivilTech</Text>
        <Text style={styles.appTagline}>Electoral Information Platform</Text>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeIcon}>🏛️</Text>
        <Text style={styles.welcomeTitle}>Welcome to CivilTech!</Text>
        <Text style={styles.welcomeSubtitle}>
          Your trusted electoral guide
        </Text>
      </View>

      {/* Verify Identity Card - Primary CTA */}
      <View style={styles.verifyCard}>
        <Text style={styles.verifyIcon}>🔐</Text>
        <Text style={styles.verifyTitle}>VERIFY YOUR IDENTITY</Text>
        <Text style={styles.verifyDescription}>
          Get access to voting details, polling location, and more.
        </Text>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerifyPress}
        >
          <Text style={styles.verifyButtonText}>Verify Now</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Access Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.tilesGrid}>
          {quickAccessTiles.map((tile) => (
            <TouchableOpacity
              key={tile.id}
              style={styles.tile}
              onPress={tile.action}
            >
              <Text style={styles.tileEmoji}>{tile.emoji}</Text>
              <Text style={styles.tileLabel}>{tile.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upcoming Dates Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Election Dates</Text>
        <View style={styles.datesList}>
          {upcomingDates.map((item, index) => (
            <View key={index} style={styles.dateCard}>
              <Text style={styles.dateIcon}>📅</Text>
              <View style={styles.dateContent}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dateEvent}>{item.event}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* News & Alerts Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>News & Important Alerts</Text>
        <View style={styles.alertsList}>
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <View
                style={[styles.alertAccent, { backgroundColor: alert.color }]}
              />
              <View style={styles.alertContent}>
                <Text style={styles.alertIcon}>{alert.icon}</Text>
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
  tileEmoji: {
    fontSize: 32,
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
    fontSize: 20,
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
    fontSize: 20,
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
