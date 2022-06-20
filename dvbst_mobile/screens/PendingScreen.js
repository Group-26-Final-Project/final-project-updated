import React, { useEffect } from 'react'

import { StyleSheet, SafeAreaView, ScrollView, View, Text, Button, ActivityIndicator } from 'react-native';
import { FAB } from 'react-native-elements';
import IdeaDetail from '../components/IdeaDetail';
import SearchBar from '../components/searchbar';
import SearchFilter from '../components/searchFilter';
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getIdeas } from '../features/ideasSlice';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading'

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
}
const PendingScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const ideasState = useSelector((state) => state.ideasState)
    const [isLoaded] = useFonts(customFonts);

    useEffect(() => {
        if (ideasState.getIdeasStatus === '') {
            dispatch(getIdeas())
        }
    }, [dispatch, ideasState.getIdeasStatus])

    console.log(ideasState.ideas, ideasState.getIdeasStatus)
    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {ideasState.getIdeasStatus === "pending" && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='#00d05a' />
                    </View>
                )}
                {ideasState.getIdeasStatus === "failed" && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.text}>Ooops something went wrong</Text>
                        <Button title="Refresh">Refresh</Button>
                    </View>
                )}
                {ideasState.getIdeasStatus === "success" && (
                    <View style={styles.container}>
                        {ideasState.ideas.length == 0 ? (
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.text}>No Ideas Posted Yet!</Text>
                            </View>
                        ) :
                            <View>
                                <SearchBar />
                                <SearchFilter />

                                <ScrollView>
                                    {ideasState.ideas.map((idea) => (
                                        <IdeaDetail
                                            key={idea._id}
                                            id={idea._id}
                                            userName={idea.username}
                                            title={idea.title}
                                            description={idea.description}
                                            voteCount={idea.likeCount}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                        }
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 40,
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontFamily: 'poppinsRegular'
    }
});
export default PendingScreen;