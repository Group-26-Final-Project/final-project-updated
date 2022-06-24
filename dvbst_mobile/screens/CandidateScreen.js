import React from 'react'
import { useEffect } from 'react';

import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import CandidateBio from '../components/candidateBio';
import CandidateDetail from '../components/candidateDetail';
import { getCandidate } from '../features/candidatesSlice';

import { useSelector, useDispatch } from 'react-redux'

const CandidateScreen = (props) => {
    const dispatch = useDispatch()
    const { candidateId } = props.route.params.params
    const candidatesState = useSelector((state) => state.candidatesState)
    console.log(candidateId)

    useEffect(() => {
        dispatch(getCandidate(candidateId))
    }, [dispatch, candidateId])

    console.log("candidate", candidatesState.candidate)
    return (
        <SafeAreaView style={styles.container}>
            {candidatesState.getCandidateStatus === 'pending' && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#00d05a' />
                </View>
            )}
            {candidatesState.getCandidateStatus === 'failed' && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Somethint Went Wrong! Go back</Text>
                </View>
            )}
            {candidatesState.getCandidateStatus === 'success' && (
                <ScrollView>
                    <CandidateBio candidate={candidatesState.candidate} image={require('../assets/portrait3.jpg')} />
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
export default CandidateScreen;