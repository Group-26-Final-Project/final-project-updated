import React from 'react';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import CandidatesScreen from '../screens/CandidateScreen';
import { voteCandidate } from '../features/votingSlice';

const customFonts = {
    poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    poppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    poppinsSemi: require('../assets/fonts/Poppins-SemiBold.ttf'),
}
const VoteComponent = (props) => {
    const navigation = useNavigation();
    const [isLoaded] = useFonts(customFonts);
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.userState)

    const viewProfile = () => {
        navigation.navigate("Candidates", {
            params: { candidateId: props.id },
        })
    };

    const vote = async () => {
        dispatch(
            voteCandidate({
                electionId: props.electionId,
                candidateId: props.id,
                voterId: userState.user._id,
            })
        )
            .unwrap()
            .then((response) => {
                navigation.navigate("Results")
            })
            .catch((error) => {
                console.log("Error", error)
                alert(error);
            });
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
                            source={require('../assets/portrait.jpg')}
                        />
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.name}>{props.name}</Text>
                        <Text style={styles.detail}>Department: {props.dept}</Text>
                        <Text style={styles.detail}>Year: {props.year}</Text>
                        <Text style={styles.detail}>Section: {props.section}</Text>
                        <TouchableOpacity onPress={vote} style={styles.button}>
                            <Text style={{ color: '#00d05a', fontSize: 16 }}>Vote</Text>
                        </TouchableOpacity>
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

export default VoteComponent;