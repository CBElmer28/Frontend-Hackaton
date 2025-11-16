import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function VerificarScreen({ navigation }) {
  const handleRoleSelect = (role) => {
    // Navigate to MainTabs and pass selected role so MainTabs can render role-specific tabs
    if (role === "member") {
      navigation.replace("MainTabs", { role: "member" });
    } else {
      navigation.replace("MainTabs", { role: "elector" });
    }
  };
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>¡Bienvenido a CivilTech!</Text>
        <Text style={styles.text}>
          Para acceder al sistema, elija su rol/opción:
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRoleSelect("member")}
        >
          <Text style={styles.buttonText}>Acceder como Miembro de Mesa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRoleSelect("elector")}
        >
          <Text style={styles.buttonText}>Acceder como Votante Civil (Elector)</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>
          Ingrese a la sección indicada según su preferencia.
        </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: "#fff",
    },
    welcome: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#007aff",
      textAlign: "center",
    },
    text: {
      fontSize: 18,
      marginBottom: 30,
      textAlign: "center",
    },
    button: {
      backgroundColor: "#007aff",
      padding: 15,
      borderRadius: 10,
      marginVertical: 10,
      width: "100%",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    footer: {
      marginTop: 30,
      fontSize: 14,
      color: "#555",
      textAlign: "center",
    },
  });