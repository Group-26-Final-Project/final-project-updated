import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { editUser } from '../features/userSlice';

const customFonts = {
    poppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
}

const EditProfileScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const authState = useSelector((state) => state.authState)
    const [plans, setPlans] = useState("");
    const [bio, setBio] = useState("");
    const [profile, setProfile] = useState(null);
    const [plansError, setPlansError] = useState(null);
    const [bioError, setBioError] = useState(null);
    // const [profileError, setProfileError] = useState(null);

    const [formErrors, setFormErrors] = useState({})
    const [isLoaded] = useFonts(customFonts);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValues = {
            plans: plans,
            bio: bio,
            // profile: profile
        };
        const errors = validate(formValues)
        if (Object.keys(errors).length === 0) {
            dispatch(editUser(formValues))
                .unwrap()
                .then((response) => {
                    setFormValues(initialValues)
                    setBioError(null)
                    setPlansError(null)
                    // setProfileError(null)
                })
                .catch((e) => {
                    console.log("Here")
                })
        } else {
            setBioError(errors.bio)
            setPlansError(errors.plans)
            // setProfileError(errors.profile);
        }
    }

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
          // console.log(response);
          if (response) {
            setProfile(response);
          }
        });
      };


    const validate = (values) => {
        const errors = {}

        if (!values.bio) {
            errors.bio = "Bio is a Required Field"
        }
        if (!values.plans) {
            errors.plans = "Plans is a Required Field"
        }
        return errors
    }

    if (!isLoaded) {
        return <AppLoading />;
    } else {
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
                        <View style={{ alignSelf: 'flex-start', marginBottom: 15 }}>
                            <Text style={{ fontSize: 36 }}>Edit Profile</Text>
                            <View style={styles.line}></View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.label}>Bio</Text>
                                <TextInput multiline={true} numberOfLines={4} style={styles.textinput} value={bio}
                                    onChangeText={(text) => { setBio(text)} } />
                                <Text style={styles.error}>{bioError}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Plans</Text>
                                <TextInput multiline={true} numberOfLines={6} style={styles.textinput} value={plans}
                                    onChangeText={(text) => { setPlans(text)} } />
                                <Text style={styles.error}>{plansError}</Text>
                            </View>
                            {/* <Button title="Choose Photo" onPress={handleChoosePhoto} /> */}
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </View>
        );
    };
    // const EditProfileScreen = (props) => {
    //     const dispatch = useDispatch()
    //     const navigation = useNavigation();
    //     const authState = useSelector((state) => state.authState)
    //     const initialValues = {
    //         profile: "", plans: "", bio: ""
    //     };

    //     const [formValues, setFormValues] = useState(initialValues)
    //     const [formErrors, setFormErrors] = useState({})
    //     const [isLoaded] = useFonts(customFonts);

    //     const changeHandler = (inputName, inputValue) => {
    //         setFormValues(prev => ({
    //             ...prev,
    //             [inputName]: inputValue
    //         }))
    //     }

    //     const handleSubmit = async (e) => {
    //         e.preventDefault();
    //         const errors = validate(formValues);
    //         if (Object.keys(errors).length === 0) {
    //             dispatch(login(formValues))
    //                 .unwrap()
    //                 .then((response) => {
    //                     setFormValues(initialValues)
    //                 })
    //                 .catch((e) => {
    //                     console.log("Here")
    //                 })
    //         } else {
    //             setFormErrors(errors);
    //         }
    //     }

    //     const validate = (values) => {
    //         const errors = {}

    //         if (!values.email) {
    //             errors.email = "Email is a Required Field"
    //         }
    //         if (!values.password) {
    //             errors.password = "Password is a Required Field"
    //         }
    //         return errors
    //     }

    //     if (!isLoaded) {
    //         return <AppLoading />;
    //     } else {
    //         return (
    //             <View style={styles.container}>
    //                 {authState.loginStatus === "pending" && (
    //                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //                         <ActivityIndicator size="large" color='#00d05a' />
    //                     </View>
    //                 )}
    //                 {authState.loginStatus === "failed" && (
    //                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //                         <Text style={styles.text}>{authState.loginError}</Text>
    //                     </View>
    //                 )}
    //                 {authState.loginStatus !== "pending" && authState.loginStatus !== "failed" && (
    //                     <View>

    //                         <View style={{ alignSelf: 'flex-start', marginBottom: 15 }}>
    //                             <Text style={{ fontSize: 36 }}>Login</Text>
    //                             <View style={styles.line}></View>
    //                         </View>
    //                         <View>
    //                             <View>
    //                                 <Text style={styles.label}>Email</Text>
    //                                 <TextInput style={styles.textinput} value={formValues.email}
    //                                     onChangeText={value => changeHandler('email', value)} />
    //                                 <Text style={styles.error}>{formErrors.email}</Text>
    //                             </View>
    //                             <View>
    //                                 <Text style={styles.label}>Password</Text>
    //                                 <TextInput secureTextEntry={true} style={styles.textinput} value={formValues.password}
    //                                     onChangeText={value => changeHandler('password', value)} />
    //                                 <Text style={styles.error}>{formErrors.password}</Text>
    //                             </View>
    //                         </View>
    //                         <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
    //                             <Text style={{ color: '#00d05a', fontSize: 14, fontFamily: 'poppinsLight' }} onPress={() => navigation.navigate('resetPassStack', { screen: 'ForgotPassword' })}>Forgot Password?</Text>
    //                         </View>
    //                         <TouchableOpacity onPress={handleSubmit} style={styles.button}>
    //                             <Text style={{ color: '#fff', fontSize: 20 }}>Login</Text>
    //                         </TouchableOpacity>
    //                         <View style={{ marginTop: 6, justifyContent: 'center', alignSelf: 'center' }}>
    //                             <Text style={{ color: '#4B4B4B', fontSize: 16, fontFamily: 'poppinsLight' }}>Don't have an account? <Text onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Register' }] })} style={{ color: '#00d05a', fontSize: 16, fontFamily: 'poppinsLight' }}>Sign Up</Text></Text>
    //                         </View>
    //                     </View>
    //                 )}
    //             </View>
    //         );
    //     }
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
        width: Dimensions.get('window').width * 0.84,
        // height: Dimensions.get('window').height * 0.06,
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 10,
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

export default EditProfileScreen;