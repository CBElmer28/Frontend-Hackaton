import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

export default function LogoutButton({ navigation }) {

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Seguro que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, salir",
          onPress: () => navigation.replace("MainTabs"),
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutText}>🚪</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
    elevation: 5,
    zIndex: 9999,
  },
  logoutText: {
    fontSize: 20,
  },
});
