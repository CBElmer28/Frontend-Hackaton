import React, { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Animated } from "react-native";

export default function SplashScreen({ navigation }) {
  const pulse = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Animación de pulso para el logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.05, duration: 600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.95, duration: 600, useNativeDriver: true }),
      ])
    ).start();

    // Navegar a la pantalla de bienvenida después de 1.5s
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { transform: [{ scale: pulse }] }]}>
        ⚪ CivilTech
      </Animated.Text>
      <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007BFF",
  },
});