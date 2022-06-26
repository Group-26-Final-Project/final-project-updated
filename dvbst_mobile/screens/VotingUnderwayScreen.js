import React from 'react'

import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Voting from '../assets/undraw_voting_nvu7 1 (1).svg';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CountdownComponent from '../components/countdown';
import { sendOTP } from '../features/votingSlice';

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
}

const VotingUnderwayScreen = ({ phase, time }) => {
    const [isLoaded] = useFonts(customFonts);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)

    const onClick = () => {
        dispatch(sendOTP(userState.user.email))
            .unwrap()
            .then((response) => {
                navigation.navigate("OTP", {
                    params: { email: userState.user.email },
                })
            })
            .catch((e) => {
                console.log("Error: ", e)
            })
    }

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                {phase === 2 && (
                    <Text style={styles.title}>Section <Text style={{ color: '#00D05A' }}>Election</Text> is Underway</Text>
                )}
                {phase === 4 && (
                    <Text style={styles.title}>Year <Text style={{ color: '#00D05A' }}>Election</Text> is Underway</Text>
                )}
                {phase === 6 && (
                    <Text style={styles.title}>School/Center <Text style={{ color: '#00D05A' }}>Election</Text> is Underway</Text>
                )}
                <Voting
                    style={styles.svg}
                    width={Dimensions.get('window').width * 0.78}
                    height={Dimensions.get('window').height * 0.40}
                />
                <CountdownComponent time={time} />
                <TouchableOpacity onPress={onClick} style={styles.button}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>Enter Election</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        // paddingTop: 10,
        backgroundColor: '#fff',
        // justifyContent: 'space-between'
    },
    title: {
        color: '#2F313D',
        fontFamily: 'poppinsRegular',
        fontSize: 45,
        marginHorizontal: 20
    },
    svg: {
        alignSelf: 'center',
        marginRight: 15,
        marginBottom: 10
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

export default VotingUnderwayScreen;