import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Paleta de colores institucional
const colors = {
    redPrimary: '#D70000',
    blueSecondary: '#1C3E6C',
    grayText: '#444444',
    white: '#FFFFFF',
    grayBackground: '#F0F2F5',
};

// Cronograma de Miembro de Mesa (Día de la Jornada)
const memberCalendarData = [
    { time: "7:00 AM", event: "Presentación e Instalación de Mesa.", duty: "Instalación" },
    { time: "7:30 AM", event: "Llenado y Cierre del Acta de Instalación.", duty: "Instalación" },
    { time: "8:00 AM", event: "Inicio de la Jornada de Sufragio.", duty: "Sufragio" },
    { time: "4:00 PM", event: "Cierre de Votación y Recolección de votos.", duty: "Sufragio" },
    { time: "4:00 PM - Fin", event: "Inicio de Escrutinio (Conteo de Votos).", duty: "Escrutinio" }
];

export default function MemberCalendarioScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Cronograma de la Jornada Electoral</Text>
            
            <View style={styles.timeline}>
                {memberCalendarData.map((item, index) => (
                    <View key={index} style={styles.timelineItem}>
                        {/* Línea divisora */}
                        <View style={styles.line} />
                        {/* Círculo de hito */}
                        <View style={[styles.circle, { backgroundColor: item.duty === 'Escrutinio' ? colors.blueSecondary : colors.redPrimary }]} />
                        
                        <View style={styles.content}>
                            <Text style={styles.time}>{item.time}</Text>
                            <Text style={styles.event}>{item.event}</Text>
                            <View style={[styles.badge, { backgroundColor: item.duty === 'Escrutinio' ? colors.blueSecondary : colors.redPrimary }]}>
                                <Text style={styles.badgeText}>{item.duty}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            <Text style={styles.warningText}>
                La **ONPE** es el organismo encargado de fiscalizar estos tiempos. El horario es estricto y el Acta de Instalación es el primer documento crucial.
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
    timeline: {
        paddingHorizontal: 10,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 25,
        minHeight: 80,
    },
    line: {
        position: 'absolute',
        left: 5,
        width: 2,
        height: '100%',
        backgroundColor: '#ccc',
        top: 0,
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginTop: 5,
        zIndex: 1,
        marginRight: 15,
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    time: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blueSecondary,
        marginBottom: 5,
    },
    event: {
        fontSize: 14,
        color: colors.grayText,
        marginBottom: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    warningText: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#fff3cd',
        color: '#856404',
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#ffc107',
        fontSize: 13,
    }
});