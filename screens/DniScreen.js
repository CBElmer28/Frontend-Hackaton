import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function DniScreen({ navigation }) {
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);

  const validarDni = async () => {
    if (!/^\d{8}$/.test(dni)) {
      Alert.alert("DNI inválido", "Debe tener exactamente 8 dígitos numéricos");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://tu-api.com/validar-dni/${dni}`);
      const persona = await response.json();
      setLoading(false);

      if (!persona || !persona.rol) {
        Alert.alert("No encontrado", "Este DNI no está registrado");
        return;
      }

      if (persona.rol === "Menor de edad" || persona.rol === "Extranjero") {
        Alert.alert("No habilitado", "Este DNI no está habilitado para votar");
        return;
      }

      navigation.replace("Verificar", { datos: persona });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error de conexión", "No se pudo conectar al servidor");
      console.error("Error al validar DNI:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validación de Identidad</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu DNI"
        keyboardType="numeric"
        maxLength={8}
        value={dni}
        onChangeText={setDni}
      />

      <TouchableOpacity style={styles.button} onPress={validarDni} disabled={loading}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});