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

const dutiesData = [
    {
        phase: "Instalación (7:00 AM)",
        icon: "🔨",
        color: colors.redPrimary,
        details: [
            "Verificar que el material electoral esté completo y sellado.",
            "Llenar y firmar el Acta de Instalación (sin errores ni borrones).",
            "Firmar el reverso de las cédulas de sufragio.",
            "Designar miembros si faltan, usando a los suplentes o electores en la fila."
        ]
    },
    {
        phase: "Sufragio (8:00 AM - 4:00 PM)",
        icon: "🗳️",
        color: colors.blueSecondary,
        details: [
            "Verificar la identidad del elector con su DNI.",
            "Entregar la cédula firmada y el tampón.",
            "Asegurarse de que el elector firme la lista de electores.",
            "Entintar el dedo índice del elector con tinta indeleble."
        ]
    },
    {
        phase: "Escrutinio (4:00 PM en adelante)",
        icon: " counted ",
        color: colors.redPrimary,
        details: [
            "Contar los votos de manera pública y transparente.",
            "Clasificar votos válidos, nulos y blancos.",
            "Llenar el Acta de Escrutinio con letra legible y sin correcciones.",
            "Entregar el material electoral en la ODPE (Oficina Descentralizada de Procesos Electorales)."
        ]
    }
];

const DutyCard = ({ phase, icon, details, color }) => (
    <View style={[styles.card, { borderLeftColor: color }]}>
        <Text style={styles.phaseTitle}>
            {icon} {phase}
        </Text>
        <View style={styles.list}>
            {details.map((detail, index) => (
                <Text key={index} style={styles.listItem}>
                    • {detail}
                </Text>
            ))}
        </View>
    </View>
);

export default function MemberDeberesScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Deberes Clave por Fase</Text>
            <Text style={styles.instructions}>
                Los siguientes puntos son las responsabilidades críticas que debes dominar para cada momento de la jornada.
            </Text>
            
            {dutiesData.map((data, index) => (
                <DutyCard 
                    key={index}
                    phase={data.phase}
                    icon={data.icon}
                    details={data.details}
                    color={data.color}
                />
            ))}

            <Text style={styles.footerText}>
                Consulta el manual oficial de la ONPE para mayor detalle sobre las actas.
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
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.redPrimary,
        paddingBottom: 5,
    },
    instructions: {
        fontSize: 14,
        color: colors.grayText,
        marginBottom: 20,
    },
    card: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    phaseTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.blueSecondary,
        marginBottom: 10,
    },
    list: {
        paddingLeft: 5,
    },
    listItem: {
        fontSize: 14,
        color: colors.grayText,
        marginBottom: 5,
    },
    footerText: {
        fontSize: 12,
        color: colors.grayText,
        textAlign: 'center',
        marginBottom: 30,
    }
});