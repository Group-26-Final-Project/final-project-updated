import React, { useState } from 'react'

import { StyleSheet, Text, SafeAreaView, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addIdeas } from '../features/ideasSlice';

const customFonts = {
    poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    poppinsSemi: require('../assets/fonts/Poppins-SemiBold.ttf'),
}

const SuggestIdeaScreen = (props) => {
    const dispatch = useDispatch()
    const ideasState = useSelector((state) => state.ideasState)
    const userState = useSelector((state) => state.userState)
    const navigation = useNavigation();
    const [isLoaded] = useFonts(customFonts);

    const initialValues = {
        title: '',
        description: ''
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({})

    const handleInputChange = (inputName, inputValue) => {
        setFormValues(prev => ({
            ...prev,
            [inputName]: inputValue
        }))
    }

    const validate = (values) => {
        const errors = {}

        if (!values.title) {
            errors.title = "Title is required"
        }
        if (!values.description) {
            errors.description = "Description is required"
        } else if (values.description.length > 250) {
            errors.description = "Description cant exceed 250 characters"
        }
        else if (values.description.length < 50) {
            errors.description = "Description cant be smaller than 50 characters"
        }
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues)
        console.log(errors)
        if (Object.keys(errors).length === 0) {
            dispatch(addIdeas({
                user_id: userState.user._id,
                username: userState.user.name + " " + userState.user.fname,
                ...formValues
            }))
                .unwrap()
                .then((response) => {
                    setFormValues(initialValues)
                    setFormErrors({})
                    navigation.navigate('Ideas')
                })
        } else {
            setFormErrors(errors);
        }
    }

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.header}>Suggest an Idea</Text>
                </View>
                <View>
                    <Text style={styles.subheader}>Write a paragraph of the idea you want to see implemented</Text>
                </View>
                <View style={styles.suggestionbox}>
                    <View style={styles.title}>
                        <TextInput
                            style={styles.input}
                            onChangeText={value => handleInputChange('title', value)}
                            placeholder="Write the title here..."
                            placeholderTextColor='rgba(35, 35, 35, 0.5)'
                        />
                    </View>
                    <Text style={styles.error}>{formErrors.title}</Text>
                    <View style={styles.suggestions}>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.input}
                            onChangeText={value => handleInputChange('description', value)}
                            placeholder="Write your suggestion here..."
                            placeholderTextColor='rgba(35, 35, 35, 0.5)'
                        />
                    </View>
                    <Text style={styles.error}>{formErrors.description}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>

                    {ideasState.addIdeasStatus === 'pending' ?
                        <ActivityIndicator animating={true} size='large' color='green' /> :
                        <Text style={{ color: '#fff', fontSize: 20 }}>Post</Text>
                    }
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 27,
        fontFamily: 'poppinsSemi',
        color: '#353535',
        paddingHorizontal: 10,
    },
    subheader: {
        fontSize: 16,
        fontFamily: 'poppinsRegular',
        color: '#353535',
        paddingHorizontal: 10,
    },
    suggestionbox: {
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.35
    },
    input: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        fontSize: 16,
        fontFamily: 'poppinsRegular',
    },
    error: {
        fontSize: 10,
        marginBottom: 10,
        color: '#ff0000',
    },
    title: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: '#F6FAFA',
        padding: 15,
        marginTop: 10
    },
    suggestions: {
        flex: 6,
        borderRadius: 15,
        backgroundColor: '#F6FAFA',
        padding: 15
    },
    button: {
        fontFamily: 'poppinsRegular',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00d05a',
        width: Dimensions.get('window').width * 0.82,
        height: Dimensions.get('window').height * 0.07,
        marginTop: 20,
        borderRadius: 10
    },
    snackbar: {
        color: 'white',
        backgroundColor: 'red',
        fontFamily: 'poppinsRegular',
        fontSize: 20
    }
});

export default SuggestIdeaScreen;