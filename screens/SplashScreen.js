import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("MainTabs");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚪ TituloDelApp</Text>
      <ActivityIndicator size="large" color="#000" />
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
  },
});
