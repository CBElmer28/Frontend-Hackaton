import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const colors = {
  redPrimary: '#D70000',
  blueSecondary: '#1C3E6C',
  grayText: '#444444',
  white: '#FFFFFF',
  grayBackground: '#F0F2F5'
};

const API_URL = 'https://backend-hackaton-seven.vercel.app';

export default function PartidoDetalleScreen({ route }) {
  const navigation = useNavigation();
  const { id, nombre } = route.params || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`${API_URL}/partidos/${id}`)
      .then(r => r.json())
      .then(json => {
        if (!active) return;
        if (json?.ok) setData(json.data);
        else setError("Error cargando partido");
      })
      .catch(() => setError("No se pudo conectar con el backend"))
      .finally(() => setLoading(false));
    return () => { active = false; };
  }, [id]);

  const candidatos = data?.candidatos || [];
  const planchas = data?.planchas || [];
  const planes = data?.planes || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{nombre || 'Partido'}</Text>
      {loading && <ActivityIndicator color={colors.redPrimary} style={{ marginTop: 10 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {data && (
        <View style={styles.card}>
          <Text style={styles.section}>Planchas presidenciales</Text>
          {planchas.length === 0 ? <Text style={styles.text}>—</Text> : null}
          {planchas.map(pp => (
            <Text key={pp.id} style={styles.text}>{pp.presidente || ''}{pp.vicepresidente1 ? ` — ${pp.vicepresidente1}` : ''}{pp.vicepresidente2 ? ` — ${pp.vicepresidente2}` : ''}</Text>
          ))}

          <Text style={styles.section}>Candidatos</Text>
          {candidatos.length === 0 ? <Text style={styles.text}>—</Text> : null}
          {candidatos.map(c => (
            <Text
              key={c.id}
              style={styles.link}
              onPress={() => navigation.navigate('CandidatoDetalle', { id: c.id, nombre: c.nombre_completo })}
            >{c.nombre_completo}</Text>
          ))}

          <Text style={styles.section}>Planes de gobierno</Text>
          {planes.length === 0 ? <Text style={styles.text}>—</Text> : null}
          {planes.map(pl => (
            <Text key={pl.id} style={styles.text}>{pl.sector || ''}{pl.titulo ? ` — ${pl.titulo}` : ''}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.grayBackground, padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.blueSecondary, marginBottom: 20, borderBottomWidth: 2, borderBottomColor: colors.redPrimary, paddingBottom: 5 },
  card: { backgroundColor: colors.white, padding: 15, borderRadius: 10 },
  section: { fontSize: 18, fontWeight: 'bold', color: colors.redPrimary, marginTop: 10 },
  text: { fontSize: 14, color: colors.grayText, marginTop: 4 },
  error: { color: colors.redPrimary },
  link: { fontSize: 14, color: colors.blueSecondary, marginTop: 4 }
});