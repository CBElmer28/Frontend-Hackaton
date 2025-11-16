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

// **********************************************
// DATOS ESTÁTICOS Y RELEVANTES DEL CALENDARIO ELECTORAL (SIMULADOS)
// **********************************************
const electoralCalendarData = [
    { 
        title: "Fase 1: Preparación y Padrón", 
        color: colors.blueSecondary, 
        items: [
            "15 de Enero de 2026: Cierre del Padrón Electoral. (La inscripción y cambios de domicilio terminan aquí).",
            "12 de Marzo de 2026: Fecha límite para la Convocatoria a Elecciones Generales (Decreto Supremo)."
        ]
    },
    { 
        title: "Fase 2: Candidaturas e Inscripciones (JNE)", 
        color: colors.redPrimary, 
        items: [
            "15 de Abril de 2026: Fecha límite para la renuncia a cargos públicos (Ministros, etc.).",
            "Mayo - Junio 2026: Elecciones internas para la selección de candidatos por las organizaciones políticas.",
            "Julio de 2026: Plazo final para la inscripción de planchas presidenciales y listas al Congreso (HdV)."
        ]
    },
    { 
        title: "Fase 3: Jornada y Votación (ONPE)", 
        color: colors.blueSecondary, 
        items: [
            "20 de Septiembre de 2026: Sorteo de Miembros de Mesa y publicación de locales de votación.",
            "Octubre de 2026: Primera vuelta de las Elecciones Generales (Fecha tentativa).",
            "Noviembre/Diciembre 2026: Posible Segunda Vuelta Presidencial."
        ]
    }
];

export default function SharedCalendarioScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Calendario Oficial de Procesos</Text>
            
            {electoralCalendarData.map((section, index) => (
                <View key={index} style={[styles.sectionCard, { borderLeftColor: section.color }]}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {section.items.map((item, itemIndex) => (
                        <Text key={itemIndex} style={styles.itemText}>
                            • {item}
                        </Text>
                    ))}
                </View>
            ))}

            <Text style={styles.footerText}>
                La información oficial es actualizada por JNE y ONPE. Este calendario es simulado y referencial.
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
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.blueSecondary,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: colors.redPrimary,
        paddingBottom: 5,
    },
    sectionCard: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blueSecondary,
        marginBottom: 8,
    },
    itemText: {
        fontSize: 14,
        color: colors.grayText,
        marginBottom: 3,
    },
    footerText: {
        fontSize: 12,
        color: colors.grayText,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
    }
});