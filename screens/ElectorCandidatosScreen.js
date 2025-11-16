import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";

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

const mockParties = [
    { name: "Fuerza Popular", leader: "K. Fujimori", color: '#FF9800' },
    { name: "Perú Libre", leader: "V. Cerrón", color: '#C00000' },
    { name: "Alianza para el Progreso", leader: "C. Acuña", color: '#2196F3' },
    { name: "Somos Perú", leader: "P. García", color: '#6A1B9A' },
    { name: "Acción Popular", leader: "A. Belaunde", color: '#4CAF50' },
];


export default function ElectorCandidatosScreen() {
    const [selectedPosition, setSelectedPosition] = useState(institutionalPositions[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredParties, setFilteredParties] = useState(mockParties);

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredParties(mockParties);
        } else {
            const results = mockParties.filter(party => 
                party.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredParties(results);
        }
    };
    
    const viewProposals = (partyName) => {
        Alert.alert(
            `Analizando Propuestas`,
            `Simulación LLM: Se iniciará la búsqueda en línea de las 3 propuestas clave del partido "${partyName}" para el cargo de ${selectedPosition}.`,
            [{ text: "OK" }]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Voto Informado: Búsqueda por Cargo</Text>

            <Text style={styles.label}>Seleccione el Cargo a Analizar:</Text>
            <View style={styles.positionSelector}>
                {institutionalPositions.map((pos, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.positionButton, selectedPosition === pos && styles.activePositionButton]}
                        onPress={() => {
                            setSelectedPosition(pos);
                            setSearchQuery("");
                            setFilteredParties(mockParties); 
                        }}
                    >
                        <Text style={[styles.positionText, selectedPosition === pos && styles.activePositionText]}>
                            {pos.split('(')[0].trim()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Búsqueda por Partido (Filtro) */}
            <Text style={styles.label}>Buscar por Nombre de Partido:</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Escriba el nombre del partido..."
                    keyboardType="default"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>🔍</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.currentPosition}>
                Candidatos (Lista simulada) para: <Text style={{fontWeight: 'bold', color: colors.redPrimary}}>{selectedPosition}</Text>
            </Text>

            {/* Resultados de Partidos */}
            <View style={styles.resultsContainer}>
                {filteredParties.length > 0 ? (
                    filteredParties.map((party, index) => (
                        <View key={index} style={[styles.partyResultCard, { borderLeftColor: party.color }]}>
                            <Text style={styles.partyName}>{party.name}</Text>
                            <Text style={styles.leader}>Líder Principal: {party.leader}</Text>
                            <TouchableOpacity style={styles.proposalsButton} onPress={() => viewProposals(party.name)}>
                                <Text style={styles.proposalsButtonText}>Ver Propuestas (LLM)</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noResults}>No se encontraron partidos que coincidan con la búsqueda.</Text>
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