import React, { useEffect } from 'react'

import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import VoteComponent from '../components/voteComponent';
import { useDispatch, useSelector } from 'react-redux'
import { getMyElection } from '../features/votingSlice';

const VotingScreen = (props) => {
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)
    const votingState = useSelector((state) => state.votingState)

    useEffect(() => {
        dispatch(getMyElection())
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            {(userState.getUserStatus === 'pending' || votingState.getMyElectionStatus === 'pending') && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#00d05a' />
                </View>
            )}
            {(userState.getUserStatus === 'failed' || votingState.getMyElectionStatus === 'failed') && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>Ooops something went wrong {userState.getUserError.message} {votingState.getMyElectionError.message}</Text>
                </View>
            )}
            {!(userState.getUserStatus === 'pending' || votingState.getMyElectionStatus === 'pending') && userState.user.role === 'voter' && votingState.election && votingState.election.candidates && (
                <ScrollView>
                    {votingState.election.candidates.map((candidate) => (
                        <VoteComponent
                            key={candidate._id}
                            id={candidate._id}
                            name={candidate.name}
                            fname={candidate.fname}
                            dept={candidate.dept}
                            year={candidate.year}
                            section={candidate.section}
                            electionId={votingState.election._id}
                        />
                    ))}
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

export default VotingScreen;