import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    grayText: '#444444',
    white: '#FFFFFF',
    grayBackground: '#F0F2F5',
};


const institutionalPositions = [
    "Presidente y Vicepresidentes",
    "Cámara de Diputados (Regional)",
    "Cámara de Senadores (Nacional)",
    "Parlamento Andino"
];

const API_URL = 'https://backend-hackaton-bice.vercel.app';


export default function ElectorCandidatosScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [candidatos, setCandidatos] = useState([]);

    useEffect(() => {
        let active = true;
        setLoading(true);
        fetch(`${API_URL}/candidatos`)
            .then(r => r.json())
            .then(json => {
                if (!active) return;
                if (json?.ok) setCandidatos(json.data || []);
                else setError("Error cargando candidatos");
            })
            .catch(() => setError("No se pudo conectar con el backend"))
            .finally(() => setLoading(false));
        return () => { active = false; };
    }, []);

    const partidos = useMemo(() => {
        const set = new Set();
        candidatos.forEach(c => { if (c.partido_nombre) set.add(c.partido_nombre); });
        return Array.from(set).sort();
    }, [candidatos]);

    const filtrados = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return candidatos;
        return candidatos.filter(c =>
            (c.nombre_completo || '').toLowerCase().includes(q) ||
            (c.partido_nombre || '').toLowerCase().includes(q)
        );
    }, [candidatos, searchQuery]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Candidatos</Text>

            <Text style={styles.label}>Buscar por nombre o partido</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Escriba nombre de candidato o partido..."
                    keyboardType="default"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <View style={styles.searchButton}><Text style={styles.searchButtonText}>🔍</Text></View>
            </View>

            {loading && <ActivityIndicator color={colors.redPrimary} style={{ marginTop: 10 }} />}
            {error ? <Text style={styles.noResults}>{error}</Text> : null}

            <Text style={styles.currentPosition}>Partidos: {partidos.join(', ')}</Text>

            <View style={styles.resultsContainer}>
                {filtrados.length > 0 ? (
                    filtrados.map((c) => (
                        <TouchableOpacity
                            key={c.id}
                            style={[styles.partyResultCard, { borderLeftColor: colors.blueSecondary }]}
                            onPress={() => navigation.navigate('CandidatoDetalle', { id: c.id, nombre: c.nombre_completo })}
                        >
                            <Text style={styles.partyName}>{c.nombre_completo}</Text>
                            <Text style={styles.leader}>Partido: {c.partido_nombre || '—'}</Text>
                            <TouchableOpacity
                                style={styles.proposalsButton}
                                onPress={() => navigation.navigate('CandidatoDetalle', { id: c.id, nombre: c.nombre_completo })}
                            >
                                <Text style={styles.proposalsButtonText}>Ver perfil</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noResults}>No se encontraron resultados.</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayBackground,
        padding: 15,
    },
    screenTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.blueSecondary,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: colors.redPrimary,
        paddingBottom: 5,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.blueSecondary,
        marginTop: 15,
        marginBottom: 8,
    },
    // --- Selector de Posición ---
    positionSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    positionButton: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: colors.white,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        flexBasis: '48%', // Distribuye en dos columnas
        alignItems: 'center',
    },
    activePositionButton: {
        backgroundColor: colors.redPrimary,
        borderColor: colors.redPrimary,
    },
    positionText: {
        fontSize: 13,
        color: colors.grayText,
        textAlign: 'center',
        fontWeight: '500',
    },
    activePositionText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    // --- Búsqueda ---
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        fontSize: 16,
        backgroundColor: colors.white,
    },
    searchButton: {
        backgroundColor: colors.blueSecondary,
        padding: 12,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    currentPosition: {
        fontSize: 14,
        color: colors.grayText,
        marginBottom: 10,
    },
    // --- Resultados ---
    resultsContainer: {
        marginTop: 10,
    },
    partyResultCard: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        borderLeftWidth: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    partyName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.blueSecondary,
        marginBottom: 5,
    },
    leader: {
        fontSize: 14,
        color: colors.grayText,
        marginBottom: 10,
    },
    proposalsButton: {
        backgroundColor: colors.redPrimary,
        padding: 8,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 5,
    },
    proposalsButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 13,
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        color: colors.grayText,
    }
});