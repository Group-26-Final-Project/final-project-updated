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
const IdeasScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const ideasState = useSelector((state) => state.ideasState)
    const [isLoaded] = useFonts(customFonts);

    useEffect(() => {
        dispatch(getIdeas())
    }, [dispatch])
    
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
                        <Button onPress={()=>dispatch(getIdeas())} title="Refresh">Refresh</Button>
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

                                <ScrollView style={{marginBottom: 120}}>
                                    {ideasState.ideas.map((idea) => (
                                        <IdeaDetail
                                            key={idea._id}
                                            id={idea._id}
                                            userName={idea.username}
                                            title={idea.title}
                                            description={idea.description}
                                            voteCount={idea.likeCount}
                                            likes={idea.likes}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                        }
                        <FAB onPress={() => navigation.navigate("Suggestion")} size='large' color='#00d05a' placement='right' icon={<MaterialIcons color='white' name='add' size={20} />} />
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 40,
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontFamily: 'poppinsRegular'
    }
});
export default IdeasScreen;