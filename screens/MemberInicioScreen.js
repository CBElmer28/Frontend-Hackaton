import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    grayText: '#444444',
    white: '#FFFFFF',
    grayBackground: '#F0F2F5',
};

export default function MemberInicioScreen() {
  const name = "Ana Laura Chávez Pérez";
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido(a), {name}!</Text>
        <Text style={styles.subtitle}>Tu rol es vital para la democracia.</Text>
      </View>

      {/* Tarjeta de Estado de Asignación */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estado de tu Asignación</Text>
        <Text style={styles.statusText}>✅ DESIGNADO(A) - PRESIDENTE DE MESA</Text>
        <Text style={styles.infoText}>
          Consulta la pestaña **Asignación** para ver tu local, aula y la hora exacta de presentación.
        </Text>
      </View>

      {/* Recordatorios Rápidos */}
      <View style={styles.quickInfoCard}>
        <Text style={styles.quickInfoTitle}>Recordatorios Clave (Día E)</Text>
        <View style={styles.bullet}>
          <Text style={styles.bulletText}>• Hora de Presentación: 7:00 AM (puntualidad obligatoria).</Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletText}>• Documento a presentar: DNI original.</Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletText}>• Revisa tus Deberes para dominar el proceso de Instalación y Escrutinio.</Text>
        </View>
      </View>

      <Text style={styles.footerText}>
        Tu compromiso garantiza un proceso transparente y ordenado.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    padding: 15,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.blueSecondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayText,
    marginTop: 5,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: colors.redPrimary,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blueSecondary,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'green',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: colors.grayText,
  },
  quickInfoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  quickInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.redPrimary,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.redPrimary + '1A',
    paddingBottom: 5,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bulletText: {
    fontSize: 14,
    color: colors.grayText,
    marginLeft: 5,
  },
  footerText: {
    fontSize: 12,
    color: colors.grayText,
    textAlign: 'center',
    marginBottom: 30,
  }
});