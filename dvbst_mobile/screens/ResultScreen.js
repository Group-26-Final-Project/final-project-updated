import React, { useEffect } from 'react'

import { StyleSheet, Text, View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ResultComponent from '../components/resultComponent';
import ResultFilter from '../components/resultFilter';
import ResultRankings from '../components/resultRankings';
import { getElections } from '../features/electionsSlice';
import { BarChart } from 'react-native-chart-kit'
import ResultChart from '../components/ResultChart';

const ResultScreen = (props) => {
    const dispatch = useDispatch()
    const electionsState = useSelector((state) => state.electionsState)
    useEffect(() => {
        dispatch(getElections())
    }, [dispatch])

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
    }

    const graphStyle = {
        marginVertical: 8,
        borderRadius: 16
    }

    // console.log(electionsState)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* <ResultComponent rank={1} add='st' vote={80} image={require('../assets/portrait3.jpg')}/>
            <View style={styles.secthi}>
                <ResultComponent rank={2} add='nd' vote={69} image={require('../assets/portrait2.jpg')}/>
                <ResultComponent rank={3} add='rd' vote={41} image={require('../assets/portrait.jpg')}/>
            </View> */}
                <ResultFilter elections={electionsState.elections} />
                {electionsState.getElectionStatus === 'pending' && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='#00d05a' />
                    </View>
                )}
                {electionsState.getElectionStatus === 'failed' && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.text}>Ooops something went wrong</Text>
                    </View>
                )}
                {electionsState.getElectionStatus === 'success' && electionsState.election && (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <ResultRankings election={electionsState.election} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <ResultChart data={electionsState.election} />

                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'auto'
    },
    secthi: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    graphStyle: {

    }
});

export default ResultScreen;