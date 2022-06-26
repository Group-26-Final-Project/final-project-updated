import React from 'react'
import { useEffect } from 'react';

import { StyleSheet, Text, View, Button, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import CandidateBio from '../components/candidateBio';
import CandidateDetail from '../components/candidateDetail';
import { getCandidate } from '../features/candidatesSlice';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'

const CandidateDetailScreen = (props) => {
    const dispatch = useDispatch()
    const { candidateId } = props.route.params.params
    const candidatesState = useSelector((state) => state.candidatesState)
    const userState = useSelector((state) => state.userState)
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack()
    }

    
    useEffect(() => {
        dispatch(getCandidate(candidateId))
    }, [dispatch, candidateId])
    
    console.log("Candidate", candidatesState.candidates, candidatesState.candidate)
    // console.log("candidate", candidatesState.candidate)
    return (
        <SafeAreaView style={styles.container}>
            {(userState.getUserStatus === 'pending' || candidatesState.getCandidateStatus === 'pending') && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#00d05a' />
                </View>
            )}
            {(userState.getUserStatus === 'failed' || candidatesState.getCandidateStatus === 'failed') && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Somethint Went Wrong! Go back</Text>
                </View>
            )}
            {(userState.getUserStatus === 'success' && candidatesState.getCandidateStatus === 'success') && (
                <ScrollView>
                    <CandidateBio candidate={candidatesState.candidate} image={{uri:'https://upo0pf2qzrb5.usemoralis.com:2053/server/files/l2iSil7CMHrhypcuog84VP1RgOkpDJ7QJC93VX5d/e45cf65395b140d256287c00e2117a85_photo_2022-06-26_14-57-53.jpg'}} />
                    <CandidateDetail candidate={candidatesState.candidate} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 40,
        backgroundColor: '#fff',
        flex: 1
    }
});
export default CandidateDetailScreen;