import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Dropdown } from 'react-native-element-dropdown';

import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomAxios from '../Api/CustomAxios';

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
}

const RequestScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const userState = useSelector((state) => state.userState);
    const initialValues = {
        description: "", type: "COMPLAINT"
    };

    const [isFocus, setIsFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isLoaded] = useFonts(customFonts);

    const changeHandler = (inputName, inputValue) => {
        setFormValues(prev => ({
            ...prev,
            [inputName]: inputValue
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const errors = validate(formValues);
            if (Object.keys(errors).length === 0) {
                await CustomAxios.post("/requests", {
                    ...formValues,
                    candidateId: userState.user._id,
                })
                navigation.goBack()
            } else {
                setFormErrors(errors);
            }
        } catch (e) {
            setError("Something went wrong")
            console.log("error", e)
        }
        setIsLoading(false)
    }

    const validate = (values) => {
        const errors = {}

        if (!values.description) {
            errors.description = "Description is a Required Field"
        } else if (values.description.length < 10) {
            errors.description = "Description is too short"
        } else if (values.description.length > 500) {
            errors.description = "Description is too long"
        }
        return errors
    }

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'flex-end', marginBottom: 15 }}>
                    <Text style={{ fontSize: 36 }}>Request</Text>
                    <View style={styles.line}></View>
                </View>
                <Text style={styles.error}>{error}</Text>
                <View>
                    <Text style={styles.label}>Type</Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={[
                            { label: "COMPLAINT", value: 'COMPLAINT' },
                            { label: "WITHDRAWAL", value: 'WITHDRAWAL' },
                        ]}
                        maxHeight={300}
                        name="type"
                        labelField="label"
                        valueField="value"
                        placeholder={'COMPLAINT'}
                        value={formValues.type}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setFormValues(prev => ({
                                ...prev,
                                type: item.value
                            }));
                            setIsFocus(false);
                        }}
                    />
                    <Text style={styles.error}>{formErrors.type}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Description</Text>
                    <TextInput multiline={true} numberOfLines={5} style={styles.textinput} value={formValues.description}
                        onChangeText={value => changeHandler('description', value)}></TextInput>
                    <Text style={styles.error}>{formErrors.description}</Text>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        marginTop: 40,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    line: {
        width: Dimensions.get('window').width * 0.14,
        height: Dimensions.get('window').height * 0.005,
        backgroundColor: '#00d05a',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    textinput: {
        padding: 10,
        marginBottom: 12,
        alignItems: 'flex-start',
        width: Dimensions.get('window').width * 0.84,
        height: Dimensions.get('window').height * 0.15,
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 10
    },
    label: {
        fontSize: 16,
        paddingBottom: 6,
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00d05a',
        width: Dimensions.get('window').width * 0.84,
        height: Dimensions.get('window').height * 0.07,
        marginTop: 20,
        borderRadius: 10
    },
    dropdown: {
        width: Dimensions.get('window').width * 0.84,
        height: Dimensions.get('window').height * 0.06,
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 10,
        padding: 10,
    },
    error: {
        fontSize: 10,
        marginBottom: 10,
        color: '#ff0000'
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        justifyContent: 'center',
        fontSize: 16,
        color: 'rgba(0,0,0,0.8)'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.8)'
    },
    iconStyle: {
        width: 35,
        height: 35,
    }
});

export default RequestScreen;