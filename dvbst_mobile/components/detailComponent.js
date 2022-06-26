import React from 'react';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const deptTypes = [
    "Center of Biomedical Engineering (CBME)",
    "School of Chemical and Bio Engineering (SCBE)",
    "School of Civil & Environmental Engineering (SCEE)",
    "School of Electrical & Computer Engineering (SECE)",
    "School of Mechanical and Industrial Engineering (SMiE)",
    "School of Information Technology Engineering (SITE)"
    // "Biomedical Engineering",
    // "Chemical Engineering",
    // "Civil Engineering",
    // "Electrical Engineering",
    // "Mechanical Engineering",
    // "Software Engineering",
];


const customFonts = {
    poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    poppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    poppinsSemi: require('../assets/fonts/Poppins-SemiBold.ttf'),
}
const DetailComponent = (props) => {
    const navigation = useNavigation();
    const [isLoaded] = useFonts(customFonts);

    const viewProfile = () => {
        navigation.navigate("CandidateDetail", {
            params: { candidateId: props.id },
        })
    };

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <TouchableOpacity onPress={viewProfile}>
                <View style={styles.container}>
                    <View style={styles.imgcontainer}>
                        <Image
                            style={styles.image}
                            source={{uri: 'https://upo0pf2qzrb5.usemoralis.com:2053/server/files/l2iSil7CMHrhypcuog84VP1RgOkpDJ7QJC93VX5d/e45cf65395b140d256287c00e2117a85_photo_2022-06-26_14-57-53.jpg'}}
                        />
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.name}>{props.name}</Text>
                        <Text style={styles.detail}>{deptTypes[props.dept]}</Text>
                        <Text style={styles.detail}>Year: {props.year}</Text>
                        <Text style={styles.detail}>Section: {props.section}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    imgcontainer: {
        height: Dimensions.get('window').height * 0.175,
        width: Dimensions.get('window').height * 0.125,
        marginRight: 15
    },
    image: {
        flex: 1,
        borderRadius: 15,
        resizeMode: 'cover',
        height: undefined,
        width: undefined,
        paddingHorizontal: 10,
    },
    description: {
        flex: 4
    },
    name: {
        fontFamily: 'poppinsMedium',
        fontSize: 20,
    },
    detail: {
        fontFamily: 'poppinsRegular',
        fontSize: 13,
        color: '#5B5B5B'
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderColor: '#00d05a',
        borderWidth: 2,
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').height * 0.05,
        borderRadius: 12
    },
});

export default DetailComponent;