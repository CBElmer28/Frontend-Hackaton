import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from "react-native";

// Paleta de colores institucional
const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    grayText: '#444444',
    white: '#FFFFFF',
    grayBackground: '#F0F2F5',
};

// Datos simulados para la asignación del miembro de mesa
const memberLocationData = {
    name: "I.E. 3080 Héroes de San Juan",
    address: "Av. Túpac Amaru 2050, Urb. Túpac Amaru, Comas, Lima.",
    room: "Pabellón A - Piso 3 - Aula 305", // Salón específico
    mesa: "N° 915243",
    startTime: "7:00 AM (Presentación Obligatoria)",
    lat: -11.9022, 
    lon: -77.0305, 
};

export default function MemberAsignacionScreen() {
    
    // Función para abrir la ubicación en Google Maps
    const openMaps = () => {
        const { lat, lon } = memberLocationData;
        // URI de Google Maps, compatible con iOS y Android
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        
        Linking.openURL(url).catch(err => console.error("Error al abrir Maps:", err));
        // [Image of: Interfaz móvil de Google Maps mostrando una ruta a una escuela]
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Local y Mesa Asignada</Text>

            <View style={styles.locationCard}>
                <Text style={styles.cardHeader}>Tu Lugar de Ejercicio del Rol</Text>
                
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Local de Votación:</Text>
                    <Text style={styles.value}>{memberLocationData.name}</Text>
                </View>
                
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Dirección Detallada:</Text>
                    <Text style={styles.value}>{memberLocationData.address}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.label}>Ubicación Interna (Aula):</Text>
                    <Text style={styles.valueHighlight}>{memberLocationData.room}</Text>
                </View>
                
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Mesa de Sufragio:</Text>
                    <Text style={styles.valueHighlight}>{memberLocationData.mesa}</Text>
                </View>
                
                <View style={styles.timeContainer}>
                    <Text style={styles.timeLabel}>Hora de Presentación OBLIGATORIA</Text>
                    <Text style={styles.timeValue}>{memberLocationData.startTime}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.mapButton}
                    onPress={openMaps}
                >
                    <Text style={styles.mapButtonText}>Ver Ruta en Google Maps 🗺️</Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.footerInfo}>
                ⚠️ Recuerda: La ausencia sin justificación genera multas. 
                Llega 1 hora antes del inicio del sufragio para la Instalación.
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
    screenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.blueSecondary,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: colors.redPrimary,
        paddingBottom: 5,
    },
    locationCard: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    cardHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.redPrimary,
        marginBottom: 15,
        textAlign: 'center',
    },
    detailItem: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    label: {
        fontSize: 13,
        color: colors.grayText,
        fontWeight: '500',
    },
    value: {
        fontSize: 15,
        color: colors.blueSecondary,
        marginTop: 2,
    },
    valueHighlight: {
        fontSize: 16,
        color: colors.redPrimary,
        fontWeight: 'bold',
        marginTop: 2,
    },
    timeContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#FDECEC',
        borderRadius: 8,
        alignItems: 'center',
    },
    timeLabel: {
        fontSize: 14,
        color: colors.redPrimary,
        fontWeight: 'bold',
    },
    timeValue: {
        fontSize: 18,
        fontWeight: '900',
        color: colors.redPrimary,
        marginTop: 5,
    },
    mapButton: {
        backgroundColor: colors.blueSecondary,
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    mapButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerInfo: {
        marginTop: 25,
        fontSize: 12,
        color: colors.grayText,
        textAlign: 'center',
    }
});