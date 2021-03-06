import React, { useState } from 'react';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const customFonts = {
    poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    poppinsSemi: require('../assets/fonts/Poppins-SemiBold.ttf'),
}

const deptTypes = [
    "Center of Biomedical Engineering (CBME)",
    "School of Chemical and Bio Engineering (SCBE)",
    "School of Civil & Environmental Engineering (SCEE)",
    "School of Electrical & Computer Engineering (SECE)",
    "School of Mechanical and Industrial Engineering (SMiE)",
    "School of Information Technology Engineering (SITE)"
    // "Software Engineering",
    // "Biomedical Engineering",
    // "Chemical Engineering",
    // "Civil Engineering",
    // "Electrical Engineering",
    // "Mechanical Engineering",
];

const CandidateDetail = (props) => {
    const [isLoaded] = useFonts(customFonts);

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>First Name</Text>
                    <Text style={styles.detailText}>{props.candidate.name}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>Father's Name</Text>
                    <Text style={styles.detailText}>{props.candidate.fname}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>Grandfather's Name</Text>
                    <Text style={styles.detailText}>{props.candidate.gname}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>Section</Text>
                    <Text style={styles.detailText}>{props.candidate.section}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>Year</Text>
                    <Text style={styles.detailText}>{props.candidate.year}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>School/Center</Text>
                    <Text style={styles.detailText}>{deptTypes[props.candidate.dept]}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderRadius: 8,
        backgroundColor: '#F6FAFA',
        shadowColor: 'rgba(35, 35, 35, 0.2)',
        marginHorizontal: 10,
        marginVertical: 8,
        paddingVertical: 14
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 12
        
    },
    detailTitle: {
        fontSize: 12,
        fontFamily: 'poppinsSemi'
    },
    detailText: {
        fontSize: 12,
        fontFamily: 'poppinsLight'
    }
});

export default CandidateDetail;