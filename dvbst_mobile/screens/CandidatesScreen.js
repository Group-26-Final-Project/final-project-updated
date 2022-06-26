import React, { useEffect } from 'react'

import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import DetailComponent from '../components/detailComponent';
import { useDispatch, useSelector } from 'react-redux'
import { getCandidates } from '../features/candidatesSlice';

const CandidatesScreen = (props) => {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)
    const candidatesState = useSelector((state) => state.candidatesState)

    useEffect(() => {
        dispatch(getCandidates())
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            {(userState.getUserStatus === 'pending' || candidatesState.getCandidatesStatus === 'pending') && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#00d05a' />
                </View>
            )}
            {(userState.getUserStatus === 'failed' || candidatesState.getCandidatesStatus === 'failed') && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>Ooops something went wrong {userState.getUserError} {votingState.getMyElectionError}</Text>
                </View>
            )}
            {(userState.getUserStatus === 'success' && candidatesState.getCandidatesStatus === 'success') && (
                < ScrollView >
                    {
                        candidatesState.candidates.map((candidate) => (
                            <DetailComponent
                                key={candidate._id}
                                id={candidate._id}
                                name={candidate.fullName}
                                dept={candidate.dept}
                                year={candidate.year}
                                section={candidate.section} />
                        ))
                    }
                </ScrollView>
            )
            }
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 40,
        backgroundColor: '#fff',
        flex: 1
    },
    candiContainer: {
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

export default CandidatesScreen;