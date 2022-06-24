import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';

const config = {
    hasXAxisBackgroundLines: false,
    xAxisLabelStyle: {
        position: 'left'
    }
};

// const chartConfig = {
//     backgroundGradientFrom: '#1E2923',
//     backgroundGradientFromOpacity: 0,
//     backgroundGradientTo: '#08130D',
//     backgroundGradientToOpacity: 0.5,
//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     strokeWidth: 2,
//     useShadowColorFromDataset: false,
// };

// const screenWidth = Dimensions.get('window').width * 0.80;
const colors = ["red", "blue", "yellow", "green", "pink", "brown", "purple", "black"]

const extractCandidateLabel = (data) => {
    console.log("Extract")
    var candidateData = [];
    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var element = data[i].name
            candidateData.push(element);
        }
    }
    return candidateData;
};

const extractCandidateValue = (data) => {
    var candidateData = [];
    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var element = data[i].voteCount
            candidateData.push(element);
        }
    }
    console.log(candidateData)
    return candidateData;
};

function ResultChart(props) {
    console.log(extractCandidateValue(props.data.candidates))
    return (
        <View>
            <VerticalBarGraph
                data={extractCandidateValue(props.data.candidates)}
                labels={extractCandidateLabel(props.data.candidates)}
                width={Dimensions.get('window').width * 0.84}
                height={Dimensions.get('window').height * 0.35}
                barRadius={5}
                barWidthPercentage={0.65}
                baseConfig={config}
                style={styles.chart}
                barColor='#00d05a'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chart: {
        marginBottom: 30,
        paddingTop: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.84,
        alignSelf: 'center',
    }
});

export default ResultChart;