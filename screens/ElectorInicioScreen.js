import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import LogoutButton from "../components/LogoutButton";

// Paleta de colores institucional
const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    grayText: '#444444',
    white: '#FFFFFF',
    grayBackground: '#F0F2F5',
    dark: '#333333',
};

const electorData = {
    name: "Renzo Allende",
    dni: "10987654",
    local: "I.E. 'Libertador San Martín' - UGEL 04",
    address: "Jr. Los Pinos N° 450, Urb. Sol de Oro, Comas.",
    room: "Pabellón D - 2do Piso - Aula 205", 
    mesa: "N° 850312",
    startTime: "8:00 AM - 4:00 PM (Sufragio)",
    lat: -11.97,
    lon: -77.05, 
};

export default function ElectorInicioScreen({navigation}) {
    const userName = electorData.name; 

    const openMaps = () => {
        const { lat, lon } = electorData;
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        Linking.openURL(url).catch(err => console.error("Error al abrir Maps:", err));
    };

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <LogoutButton navigation={navigation} />
        <ScrollView style={styles.container}>
            <Text style={styles.welcome}>¡Bienvenido(a), {userName}!</Text>
            <Text style={styles.introText}>Aquí está la información clave para ejercer tu voto:</Text>

            <View style={styles.locationCard}>
                <Text style={styles.cardHeader}>📍 Tu Centro de Votación Asignado</Text>
                
                <Text style={styles.detailLabel}>Local:</Text>
                <Text style={styles.detailValue}>{electorData.local}</Text>
                
                <Text style={styles.detailLabel}>Dirección:</Text>
                <Text style={styles.detailValue}>{electorData.address}</Text>

                <Text style={styles.detailLabel}>Mesa y Aula:</Text>
                <Text style={styles.highlightValue}>Mesa {electorData.mesa} / {electorData.room}</Text>

                <Text style={styles.timeLabel}>Horario de Sufragio:</Text>
                <Text style={styles.timeValue}>{electorData.startTime}</Text>

                <TouchableOpacity 
                    style={styles.mapButton}
                    onPress={openMaps}
                >
                    <Text style={styles.mapButtonText}>Ver Ubicación en Maps</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.callToAction}>
                Utiliza la pestaña **"Candidatos"** para analizar por quién puedes votar en cada cargo.
            </Text>

        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayBackground,
        padding: 15,
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.redPrimary,
        marginBottom: 5,
        marginTop: 10,
    },
    introText: {
        fontSize: 16,
        color: colors.blueSecondary,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    locationCard: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
        borderTopWidth: 8,
        borderTopColor: colors.blueSecondary,
        marginBottom: 30,
    },
    cardHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.blueSecondary,
        marginBottom: 15,
        textAlign: 'center',
    },
    detailLabel: {
        fontSize: 13,
        color: colors.grayText,
        marginTop: 8,
    },
    detailValue: {
        fontSize: 16,
        color: colors.dark,
        fontWeight: '500',
    },
    highlightValue: {
        fontSize: 17,
        color: colors.redPrimary,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 10,
    },
    timeLabel: {
        fontSize: 14,
        color: colors.blueSecondary,
        fontWeight: '600',
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: colors.grayBackground,
        paddingTop: 10,
    },
    timeValue: {
        fontSize: 18,
        fontWeight: '900',
        color: colors.redPrimary,
    },
    mapButton: {
        backgroundColor: colors.redPrimary,
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    mapButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 'bold',
    },
    callToAction: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.grayText,
        textAlign: 'center',
        padding: 15,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginBottom: 30,
    }
});