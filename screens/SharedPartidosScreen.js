import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    grayText: '#444444',
    white: '#FFFFFF',
    grayBackground: '#F0F2F5',
    dark: '#333333'
};

const API_URL = 'https://backend-hackaton-bice.vercel.app';

export default function SharedPartidosScreen() {
    const navigation = useNavigation();
    const [partidos, setPartidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        setLoading(true);
        fetch(`${API_URL}/partidos`)
            .then(r => r.json())
            .then(json => {
                if (!active) return;
                if (json?.ok) setPartidos(json.data || []);
                else setError("Error cargando partidos");
            })
            .catch(() => setError("No se pudo conectar con el backend"))
            .finally(() => setLoading(false));
        return () => { active = false; };
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Partidos</Text>
            {loading && <ActivityIndicator color={colors.redPrimary} style={{ marginBottom: 10 }} />}
            {error ? <Text style={styles.instructionText}>{error}</Text> : null}

            {partidos.map((p) => (
                <TouchableOpacity
                    key={p.id}
                    style={[styles.candidateCard, { borderLeftColor: colors.blueSecondary }]}
                    onPress={() => navigation.navigate('PartidoDetalle', { id: p.id, nombre: p.nombre })}
                >
                    <Text style={styles.partyName}>{p.nombre}</Text>
                    <Text style={styles.leaderName}>{p.acronimo || ''}</Text>
                    <TouchableOpacity
                        style={[styles.buttonDetails, { backgroundColor: colors.blueSecondary }]}
                        onPress={() => navigation.navigate('PartidoDetalle', { id: p.id, nombre: p.nombre })}
                    >
                        <Text style={styles.buttonText}>Ver detalle</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
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
    instructionText: {
        fontSize: 14,
        color: colors.grayText,
        marginBottom: 15,
    },
    candidateCard: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    partyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.dark,
        marginBottom: 5,
    },
    leaderName: {
        fontSize: 15,
        color: colors.grayText,
        marginBottom: 10,
    },
    buttonDetails: {
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.redPrimary,
        marginTop: 15,
        marginBottom: 10,
    },
    infoBox: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
    },
    infoText: {
        fontSize: 14,
        color: colors.grayText,
    }
});