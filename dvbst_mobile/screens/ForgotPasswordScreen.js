import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../features/resetPassSlice'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
}

const ForgotPasswordScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const resetPasswordState = useSelector((state) => state.resetPasswordState)
    const initialValues = {
        email: ""
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        if (Object.keys(errors).length === 0) {
            dispatch(forgotPassword(formValues))
                .unwrap()
                .then((response) => {
                    navigation.navigate("resetPassStack", {
                        screen: 'ConfirmCode',
                        params: { email: formValues.email },
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
        if (!values.email) {
            errors.email = "Email is a Required Field"
        }
        return errors
    }

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                {resetPasswordState.forgotPasswordStatus === "pending" && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='#00d05a' />
                    </View>
                )}
                {resetPasswordState.forgotPasswordStatus === "failed" && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.text}>{resetPasswordState.forgotPasswordError}</Text>
                    </View>
                )}
                {resetPasswordState.forgotPasswordStatus !== "pending" && resetPasswordState.forgotPasswordStatus !== "failed" && (
                    <View>
                        <View style={{alignSelf: 'flex-start', marginBottom: 15 }}>
                            <Text style={{ fontSize: 36 }}>Reset Password</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View style={{marginBottom: 6}}>
                            <Text style={styles.text}>Enter the email associated with your account and we'll send an email with instructions to reset your password</Text>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.label}>Email</Text>
                                <TextInput style={styles.textinput} value={formValues.email}
                                    onChangeText={value => changeHandler('email', value)} />
                                <Text style={styles.error}>{formErrors.email}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Receive Email</Text>
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
        marginBottom: 10
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

export default ForgotPasswordScreen;