import React from 'react'

import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Voting from '../assets/undraw_voting_nvu7 1 (1).svg';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CountdownComponent from '../components/countdown';

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
}

const BeforeVotingScreen = ({ phase, time }) => {
    const [isLoaded] = useFonts(customFonts);

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                {phase === 0 && (
                    <Text style={styles.title}>Currently <Text style={{ color: '#00D05A' }}>Registering</Text></Text>
                )}
                {(phase === 1 ||
                    phase === 3 ||
                    phase === 5) && (
                        <Text style={styles.title}>Voting <Text style={{ color: '#00D05A' }}>Opens</Text> in</Text>
                    )}
                {phase === 7 && (
                    <Text style={styles.title}>All Elections <Text style={{ color: '#00D05A' }}>Completed</Text></Text>
                )}
                <Voting
                    style={styles.svg}
                    width={Dimensions.get('window').width * 0.78}
                    height={Dimensions.get('window').height * 0.40}
                />
                <CountdownComponent time={time} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    // container: {
    //     paddingHorizontal: 10,
    //     paddingTop: 40,
    //     backgroundColor: '#fff',
    //     justifyContent: 'space-between'
    // },
    title: {
        color: '#2F313D',
        fontFamily: 'poppinsRegular',
        fontSize: 45,
        marginHorizontal: 20
    },
    svg: {
        alignSelf: 'center',
        marginRight: 15,
        marginBottom: 30
        // borderColor: '#000',
        // borderWidth: 0.5
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00d05a',
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.07,
        marginVertical: 20,
        borderRadius: 10
    },
});

export default BeforeVotingScreen;