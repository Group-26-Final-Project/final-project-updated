import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'
import { useNavigation } from '@react-navigation/native';

import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';

const LoginScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const authState = useSelector((state) => state.authState)
    const initialValues = {
        email: "", password: ""
    };

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})

    const changeHandler = (inputName, inputValue) => {
        setFormValues(prev => ({
            ...prev,
            [inputName]: inputValue
        }))
    }


    //navigate to OTP page and pass email info to otp page as well!

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        if (Object.keys(formErrors).length === 0) {
            dispatch(login(formValues))
                .unwrap()
                .then((response) => {
                    navigation.navigate("loginStack", {
                        screen: 'Otp',
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
        if (!values.password) {
            errors.password = "Password is a Required Field"
        }
        return errors
    }

    return (
        <View style={styles.container}>
            {authState.loginStatus === "pending" && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#00d05a' />
                </View>
            )}
            {authState.loginStatus === "failed" && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>{authState.loginError}</Text>
                </View>
            )}
            {authState.loginStatus !== "pending" && authState.loginStatus !== "failed" && (
                <View>

                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: 15 }}>
                        <Text style={{ fontSize: 36 }}>Login</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput style={styles.textinput} value={formValues.email}
                                onChangeText={value => changeHandler('email', value)} />
                            <Text style={styles.error}>{formErrors.email}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Password</Text>
                            <TextInput style={styles.textinput} value={formValues.password}
                                onChangeText={value => changeHandler('password', value)} />
                            <Text style={styles.error}>{formErrors.password}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
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
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    textinput: {
        padding: 10,
        marginBottom: 20,
        width: Dimensions.get('window').width * 0.84,
        height: Dimensions.get('window').height * 0.06,
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 10
    },
    label: {
        fontSize: 16,
        paddingBottom: 10,
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

export default LoginScreen;