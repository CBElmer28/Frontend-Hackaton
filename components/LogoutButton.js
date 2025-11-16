import React from "react";
import { TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LogoutButton({ navigation }) {

  const handleLogout = () => {
    if (!navigation) {
      console.warn("LogoutButton: navigation is undefined.");
      return;
    }

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
      <Ionicons name="log-out-outline" size={24} color="#D70000" />
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
});
