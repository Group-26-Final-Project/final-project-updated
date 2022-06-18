import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { resetPassword } from '../features/resetPassSlice';

import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
}

const ResetPasswordScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const resetPasswordState = useSelector((state) => state.resetPasswordState)
    const initialValues = {
        password: "", confpass: ""
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
            dispatch(resetPassword({
                resetToken: resetPasswordState.resetToken,
                password: formValues.password
            }))
                .unwrap()
                .then((response) => {
                    navigation.navigate("resetPassStack", {
                        screen: 'ResetSuccess',
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
        const passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

        if (!values.password) {
            errors.password = "Password is a Required Field";
        } else if (!passRegex.test(values.password)) {
            errors.password = "Password must have at least eight characters and contain at least one uppercase letter, one lowercase letter, one number and one special character"
        }
        if (!values.confpass) {
            errors.confpass = "Confirm Password is a Required Field";
        } else if (values.confpass !== values.password) {
            errors.confpass = "Passwords should match"
        }
        return errors
    }

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                {resetPasswordState.resetPasswordStatus === "pending" && (
                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color='#00d05a' />
                    </View>
                )}
                {resetPasswordState.resetPasswordStatus === "failed" && (
                    <Text style={styles.error}>{resetPasswordState.resetPasswordError.message}</Text>
                )}
                {resetPasswordState.resetPasswordStatus !== "pending" && (
                    <View>

                        <View style={{ alignSelf: 'flex-start', marginBottom: 15 }}>
                            <Text style={{ fontSize: 36 }}>Create New Password</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View>
                            <Text style={styles.text}>The password must be at least 8 characters long and contains at least one Uppercase, one Lowercase, one special character and one number</Text>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.label}>Password</Text>
                                <TextInput secureTextEntry style={styles.textinput} value={formValues.password}
                                    onChangeText={value => changeHandler('password', value)} />
                                <Text style={styles.error}>{formErrors.password}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput style={styles.textinput} value={formValues.confpass}
                                    onChangeText={value => changeHandler('confpass', value)} />
                                <Text style={styles.error}>{formErrors.confpass}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>Reset Password</Text>
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
    error: {
        fontSize: 10,
        marginBottom: 10,
        color: '#ff0000'
    },
    text: {
        fontFamily: 'poppinsRegular',
        fontSize: 14,
        color: '#4B4B4B',
        marginBottom: 10,
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
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.07,
        marginTop: 20,
        borderRadius: 10
    },
});

export default ResetPasswordScreen;