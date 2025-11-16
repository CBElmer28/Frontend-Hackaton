import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking, TouchableOpacity } from "react-native";

const colors = {
  redPrimary: '#D70000',
  blueSecondary: '#1C3E6C',
  grayText: '#444444',
  white: '#FFFFFF',
  grayBackground: '#F0F2F5'
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
      .then(r => r.json())
      .then(json => {
        if (!active) return;
        if (json?.ok) setData(json.data);
        else setError("Error cargando candidato");
      })
      .catch(() => setError("No se pudo conectar con el backend"))
      .finally(() => setLoading(false));

    return () => { active = false; };
  }, [id]);

  const renderHojaVida = hv => {
    if (!hv) return <Text style={styles.text}>—</Text>;

    return (
      <View style={{ marginTop: 5 }}>
        <InfoRow label="Origen" value={hv.origen} />
        <InfoRow label="Partido" value={hv.partido} />
        <InfoRow label="Estado" value={hv.estado} />
        <InfoRow label="Notas" value={hv.notas} />

        {hv.fuentes && hv.fuentes.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sectionMini}>Fuentes</Text>
            {hv.fuentes.map((url, i) => (
              <TouchableOpacity key={i} onPress={() => Linking.openURL(url)}>
                <Text style={styles.link}>• {url}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{nombre || "Candidato"}</Text>

      {loading && <ActivityIndicator color={colors.redPrimary} style={{ marginTop: 10 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {data && (
        <View style={styles.card}>

          <Text style={styles.section}>Partido</Text>
          <Text style={styles.text}>{data.partido_nombre || "—"}</Text>

          <Text style={styles.section}>Hoja de Vida</Text>
          {renderHojaVida(data.hoja_vida)}

          <Text style={styles.section}>Propuestas</Text>
          {(data.propuestas || []).map(p => (
            <InfoRow
              key={p.id}
              label={p.titulo || "Propuesta"}
              value={p.descripcion}
              bullet
            />
          ))}

          <Text style={styles.section}>Candidaturas</Text>
          {(data.candidaturas || []).map(ca => (
            <InfoRow
              key={ca.id}
              label={ca.cargo}
              value={ca.region_nombre}
              bullet
            />
          ))}

          <Text style={styles.section}>Noticias</Text>
          {(data.noticias || []).map(n => (
            <InfoRow
              key={n.id}
              label={n.titulo}
              bullet
            />
          ))}

        </View>
      )}
    </ScrollView>
  );
}

function InfoRow({ label, value, bullet = false }) {
  return (
    <View style={{ marginVertical: 3 }}>
      <Text style={styles.text}>
        {bullet ? "• " : ""}
        <Text style={styles.textBold}>{label}</Text>
        {value ? ` — ${value}` : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    padding: 15
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.blueSecondary,
    marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: colors.redPrimary,
    paddingBottom: 5
  },
  card: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.redPrimary,
    marginTop: 15,
    marginBottom: 5
  },
  sectionMini: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.blueSecondary,
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: colors.grayText
  },
  textBold: {
    fontWeight: "bold",
    color: colors.grayText
  },
  link: {
    color: colors.redPrimary,
    textDecorationLine: "underline",
    marginVertical: 2
  },
  error: {
    color: colors.redPrimary,
    marginBottom: 10
  }
});
