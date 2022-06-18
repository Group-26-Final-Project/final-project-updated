import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'
import { useNavigation } from '@react-navigation/native';
import { confirmCode } from '../features/resetPassSlice'
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
}

const ConfirmCodeScreen = (props) => {
    const { email } = props.route.params;
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const resetPasswordState = useSelector((state) => state.resetPasswordState)
    const initialValues = {
        code: ""
    };


    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isLoaded] = useFonts(customFonts);

    const changeHandler = (inputName, inputValue) => {
        setFormValues(prev => ({
            ...prev,
            [inputName]: inputValue
        }))
    }

    useEffect(() => {

    }, [resetPasswordState])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        console.log(errors)
        if (Object.keys(errors).length === 0) {
            dispatch(confirmCode({
                email: email,
                code: formValues.code
            }))
                .unwrap()
                .then((response) => {
                    navigation.navigate("resetPassStack", {
                        screen: 'ResetPassword',
                    })
                    setFormValues(initialValues)
                })
                .catch((e) => {
                    console.log("Here")
                })
        } else {
            setFormErrors(errors);
        }
    }

    const validate = (values) => {
        const errors = {}
        if (values.code < 6) {
            errors.code = "OTP is 6 digits long"
        }
        return errors
    }

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                {resetPasswordState.confirmCodeStatus === "pending" && (
                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='#00d05a' />
                    </View>
                )}
                {resetPasswordState.confirmCodeStatus === "failed" && (
                    <Text style={styles.error}>{resetPasswordState.confirmCodeError.message}</Text>

                )}
                {resetPasswordState.confirmCodeStatus !== "pending" && (
                    <View>
                        <View style={{ alignSelf: 'flex-start', marginBottom: 15 }}>
                            <Text style={{ fontSize: 36 }}>Confirm Code</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View>
                            <Text style={styles.text}>Enter the 6-digit OTP you received in your email.</Text>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.label}>Code</Text>
                                <TextInput style={styles.textinput} value={formValues.code}
                                    onChangeText={value => changeHandler('code', value)} />
                                <Text style={styles.error}>{formErrors.code}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    text: {
        fontFamily: 'poppinsRegular',
        fontSize: 14,
        color: '#4B4B4B',
        marginBottom: 10,
    },
    error: {
        fontSize: 10,
        marginBottom: 10,
        color: '#ff0000'
    },
    textinput: {
        padding: 10,
        marginBottom: 12,
        width: Dimensions.get('window').width * 0.84,
        height: Dimensions.get('window').height * 0.06,
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
});

export default ConfirmCodeScreen;