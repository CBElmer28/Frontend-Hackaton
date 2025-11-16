import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const colors = {
  redPrimary: "#D70000",
  blueSecondary: "#1C3E6C",
  grayText: "#444444",
  white: "#FFFFFF",
  grayBackground: "#F0F2F5",
};

const API_URL = "https://backend-hackaton-bice.vercel.app";

export default function CandidatoDetalleScreen({ route }) {
  const { id, nombre } = route.params || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`${API_URL}/candidatos/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (!active) return;
        if (json?.ok) setData(json.data);
        else setError("Error al cargar el candidato");
      })
      .catch(() => setError("No se pudo conectar con el servidor"))
      .finally(() => setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  const Section = ({ icon, label }) => (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={18} color={colors.redPrimary} style={{ marginRight: 6 }} />
      <Text style={styles.section}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{nombre || "Candidato"}</Text>
      {loading && <ActivityIndicator color={colors.redPrimary} style={{ marginTop: 10 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {data && (
        <View style={styles.card}>
          <Section icon="flag" label="Partido" />
          <Text style={styles.text}>{data.partido_nombre || "—"}</Text>

          <Section icon="document-text" label="Hoja de vida" />
          <Text style={styles.text}>
            {data.hoja_vida ? JSON.stringify(data.hoja_vida) : "—"}
          </Text>

          <Section icon="bulb" label="Propuestas" />
          {(data.propuestas || []).map((p) => (
            <Text key={p.id} style={styles.text}>
              {p.titulo || "Propuesta"}
              {p.descripcion ? ` — ${p.descripcion}` : ""}
            </Text>
          ))}

          <Section icon="briefcase" label="Candidaturas" />
          {(data.candidaturas || []).map((ca) => (
            <Text key={ca.id} style={styles.text}>
              {ca.cargo || ""}
              {ca.region_nombre ? ` — ${ca.region_nombre}` : ""}
            </Text>
          ))}

          <Section icon="newspaper" label="Noticias" />
          {(data.noticias || []).map((n) => (
            <Text key={n.id} style={styles.text}>{n.titulo || ""}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.grayBackground, padding: 15 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.blueSecondary,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.redPrimary,
    paddingBottom: 5,
  },
  card: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.redPrimary,
  },
  text: { fontSize: 14, color: colors.grayText, marginTop: 4 },
  error: { color: colors.redPrimary },
});