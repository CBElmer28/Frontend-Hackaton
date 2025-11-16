import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    grayText: '#444444',
    white: '#FFFFFF',
    grayBackground: '#F0F2F5',
    dark: '#333333'
};

// **********************************************
// DATOS ESTÁTICOS DE CANDIDATOS PRESIDENCIALES
// **********************************************
const presidentialCandidates = [
    { party: "Fuerza Popular", leader: "Keiko Fujimori", color: '#FF9800' },
    { party: "Perú Libre", leader: "Vladimir Cerrón", color: '#C00000' },
    { party: "Alianza para el Progreso", leader: "César Acuña", color: '#2196F3' },
    { party: "Acción Popular", leader: "Alfredo Barnechea", color: '#4CAF50' },
    { party: "Avanza País", leader: "Hernando de Soto", color: '#FF5722' }
];

export default function SharedPartidosScreen() {
    
    const viewDetails = (leader) => {
        Alert.alert(
            `Propuestas de ${leader}`,
            `Simulación LLM: Se buscaría en línea las 3 propuestas clave del candidato ${leader} (Economía, Salud, Seguridad) y noticias recientes, citando fuentes.`,
            [{ text: "OK" }]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Planchas Presidenciales 2026</Text>
            
            <Text style={styles.instructionText}>
                Información sobre los planes de gobierno y las hojas de vida (HdV) de los candidatos, obtenida de Infogob (simulado).
            </Text>

            {/* Listado de Planchas */}
            {presidentialCandidates.map((candidate, index) => (
                <View key={index} style={[styles.candidateCard, { borderLeftColor: candidate.color }]}>
                    <Text style={styles.partyName}>{candidate.party}</Text>
                    <Text style={styles.leaderName}>Candidato: {candidate.leader}</Text>
                    
                    <TouchableOpacity 
                        style={[styles.buttonDetails, { backgroundColor: colors.blueSecondary }]}
                        onPress={() => viewDetails(candidate.leader)}
                    >
                        <Text style={styles.buttonText}>Ver Propuestas y Noticias 🔍</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {/* Bloque de Información sobre otros cargos */}
            <Text style={styles.subHeader}>Candidatos al Congreso y Andino</Text>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    La información detallada por distrito electoral y las hojas de vida de los candidatos al Congreso y Parlamento Andino se encuentra en la pestaña **Candidatos**, donde podrás filtrar por cargo.
                </Text>
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