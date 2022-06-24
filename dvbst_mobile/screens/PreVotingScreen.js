import React, { useEffect } from 'react'

import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getCurrentPhase } from '../features/votingSlice';
import VotingUnderwayScreen from '../screens/VotingUnderwayScreen';
import BeforeVotingScreen from '../screens/BeforeVotingScreen';

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
}

const PreVotingScreen = (props) => {
    const [isLoaded] = useFonts(customFonts);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const votingState = useSelector((state) => state.votingState)

    useEffect(() => {
        dispatch(getCurrentPhase())
            .unwrap()
            .then(() => {
                console.log(votingState.currentPhase);
                // startTimer(Number(votingState.currentPhase[2].hex));
            })
            .catch(() => { });
    }, [dispatch]);

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
                <ScrollView>

                    {votingState.getCurrentPhaseStatus === "pending" && (
                        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color='#00d05a' />
                        </View>
                    )}
                    {votingState.getCurrentPhaseStatus === 'failed' && (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.text}>Ooops something went wrong</Text>
                        </View>
                    )}
                    {votingState.getCurrentPhaseStatus === "success" && (
                        <>
                            {votingState.currentPhase[0] === 0 && (
                                <BeforeVotingScreen
                                    phase={votingState.currentPhase[0]}
                                    time={Number(votingState.currentPhase[2].hex)}
                                />
                            )}
                            {(votingState.currentPhase[0] === 1 ||
                                votingState.currentPhase[0] === 3 ||
                                votingState.currentPhase[0] === 5) && (
                                    <BeforeVotingScreen
                                        phase={votingState.currentPhase[0]}
                                        time={Number(votingState.currentPhase[2].hex)}
                                    />
                                )}
                            {(votingState.currentPhase[0] === 2 ||
                                votingState.currentPhase[0] === 4 ||
                                votingState.currentPhase[0] === 6) && (
                                    <VotingUnderwayScreen
                                        phase={votingState.currentPhase[0]}
                                        time={Number(votingState.currentPhase[2].hex)}
                                    />
                                )}
                            {votingState.currentPhase[0] === 7 && (
                                <BeforeVotingScreen
                                    phase={votingState.currentPhase[0]}
                                    time={Number(votingState.currentPhase[2].hex)}
                                />
                            )}
                        </>

                    )}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 40,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
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

export default PreVotingScreen;