import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box'
import { SafeAreaView } from 'react-native-safe-area-context';
import { register } from '../features/authSlice';

const RegisterScreen = (props) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const authState = useSelector((state) => state.authState)

    const initialValues = {
        name: "", fname: "", gname: "",
        dept: "", section: "", year: "",
        email: "", id: "", phone: "",
        password: "", confpass: "",
        role: "voter"
    };

    const [isFocus, setIsFocus] = useState(false);
    const [isCandidate, setIsCandidate] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const changeHandler = (inputName, inputValue) => {
        setFormValues(prev => ({
            ...prev,
            [inputName]: inputValue
        }))
    }

    const onCheckClicked = () => {
        setIsCandidate(!isCandidate)
        setFormValues({ ...formValues, role: !isCandidate ? "candidate" : "voter" })
    }

    const validate = (values) => {
        const errors = {};
        const nameRegex = new RegExp("^[a-zA-Z]{3,20}$");
        const idRegex = new RegExp("^[a-zA-Z]{3}/[0-9]{4}/[0-9]{2}$");
        const emailRegex = new RegExp("^[A-Za-z0-9]{1,64}@(.+)$");
        const phoneRegex = new RegExp("^09[0-9]{8}$");
        const passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

        if (!values.name) {
            errors.name = "Name is a Required Field";
        } else if (!nameRegex.test(values.name)) {
            errors.name =
                "Invalid Name (Only Upper/Lower Case alphabets 3-20 characters long)";
        }
        if (!values.fname) {
            errors.fname = "Father's Name is a Required Field";
        } else if (!nameRegex.test(values.fname)) {
            errors.fname =
                "Invalid Name (Only Upper/Lower Case alphabets  3-20 characters long)";
        }
        if (!values.gname) {
            errors.gname = "Grandfather's Name is a Required Field";
        } else if (!nameRegex.test(values.gname)) {
            errors.gname =
                "Invalid Name (Only Upper/Lower Case alphabets  3-20 characters long)";
        }
        if (!values.dept) {
            errors.dept = "Select School/Center from dropdown";
        }
        if (!values.section) {
            errors.section = "Select Section from dropdown";
        }
        if (!values.year) {
            errors.year = "Select Year from dropdown";
        }
        if (!values.id) {
            errors.id = "ID is a Required Field";
        } else if (!idRegex.test(values.id)) {
            errors.id = "Invalid ID Format (eg. ATR/1234/09)";
        }
        if (!values.email) {
            errors.email = "Email is a Required Field";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid Email Address (eg. useremail@email.com)";
        }
        if (!values.phone) {
            errors.phone = "Phone is a Required Field";
        } else if (!phoneRegex.test(values.phone)) {
            errors.phone = "Invalid Phone Number (eg. 0911123456)";
        }
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
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        console.log(errors)
        if (Object.keys(errors).length === 0) {
            dispatch(register(formValues))
                .unwrap()
                .then((response) => {
                    setFormValues(initialValues)
                    setFormErrors({})
                    navigation.navigate('Login')
                })
                .catch((e) => {
                    console.log("Here", e)
                })
        } else {
            setFormErrors(errors);
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ alignItems: 'flex-end', marginBottom: 15 }}>
                    <Text style={{ fontSize: 36 }}>Register</Text>
                    <View style={styles.line}></View>
                </View>
                <View>
                    <View>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.textinput} value={formValues.name}
                            onChangeText={value => changeHandler('name', value)}></TextInput>
                        <Text style={styles.error}>{formErrors.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Father's Name</Text>
                        <TextInput style={styles.textinput} value={formValues.fname}
                            onChangeText={value => changeHandler('fname', value)}></TextInput>
                        <Text style={styles.error}>{formErrors.fname}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Grandfather's Name</Text>
                        <TextInput style={styles.textinput} value={formValues.gname}
                            onChangeText={value => changeHandler('gname', value)}></TextInput>
                        <Text style={styles.error}>{formErrors.gname}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>ID</Text>
                        <TextInput style={styles.textinput} value={formValues.id}
                            onChangeText={value => changeHandler('id', value)}></TextInput>
                        <Text style={styles.error}>{formErrors.id}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.textinput} value={formValues.email}
                            onChangeText={value => changeHandler('email', value)}></TextInput>
                        <Text style={styles.error}>{formErrors.email}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput style={styles.textinput} name="phone" value={formValues.phone} keyboardType="phone-pad"
                            onChangeText={value => changeHandler('phone', value)}></TextInput>
                        <Text style={styles.error}>{formErrors.phone}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>School/Center</Text>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                {label: "Center of Biomedical Engineering (CBME)", value:0},
                                {label: "School of Chemical and Bio Engineering (SCBE)", value:1},
                                {label: "School of Civil & Environmental Engineering (SCEE)", value:2},
                                {label: "School of Electrical & Computer Engineering (SECE)", value: 3},
                                {label: "School of Mechanical and Industrial Engineering (SMiE)", value: 4},
                                {label: "School of Information Technology Engineering (SITE)", value: 5}
                            ]}
                            // data={[
                            //     { label: "Biomedical Engineering", value: 0 },
                            //     { label: "Chemical Engineering", value: 1 },
                            //     { label: "Civil Engineering", value: 2 },
                            //     { label: "Electrical Engineering", value: 3 },
                            //     { label: "Mechanical Engineering", value: 4 },
                            //     { label: "Software Engineering", value: 5 },
                            // ]}
                            maxHeight={300}
                            name="dept"
                            labelField="label"
                            valueField="value"
                            placeholder={'All'}
                            value={formValues.dept}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setFormValues(prev => ({
                                    ...prev,
                                    dept: item.value
                                }));
                                setIsFocus(false);
                            }}
                        />
                        <Text style={styles.error}>{formErrors.dept}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Year</Text>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { label: "1", value: 1 },
                                { label: "2", value: 2 },
                                { label: "3", value: 3 },
                                { label: "4", value: 4 },
                                { label: "5", value: 5 },
                            ]}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'All'}
                            value={formValues.year}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setFormValues(prev => ({
                                    ...prev,
                                    year: item.value
                                }));
                                setIsFocus(false);
                            }}
                        />
                        <Text style={styles.error}>{formErrors.year}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Section</Text>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { label: "1", value: 1 },
                                { label: "2", value: 2 },
                                { label: "3", value: 3 }
                            ]}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'All'}
                            value={formValues.section}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setFormValues(prev => ({
                                    ...prev,
                                    section: item.value
                                }));
                                setIsFocus(false);
                            }}
                        />
                        <Text style={styles.error}>{formErrors.section}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Password</Text>
                        <TextInput secureTextEntry={true} style={styles.textinput} value={formValues.password}
                            onChangeText={value => changeHandler('password', value)}></TextInput>
                        <Text style={styles.error}>{formErrors.password}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput secureTextEntry={true} style={styles.textinput} value={formValues.confpass}
                            onChangeText={value => changeHandler('confpass', value)}></TextInput>
                        <Text style={styles.error}>{formErrors.confpass}</Text>
                    </View>
                    <View>
                        <CheckBox
                            onClick={onCheckClicked}
                            isChecked={isCandidate}
                            rightText={"I want to be a candidate"}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>Register</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 6, justifyContent: 'center', alignSelf: 'center', marginBottom: 40 }}>
                    <Text style={{ color: '#4B4B4B', fontSize: 16, fontFamily: 'poppinsLight' }}>Already have an account? <Text onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })} style={{ color: '#00d05a', fontSize: 16, fontFamily: 'poppinsLight' }}>Log in</Text></Text>
                </View>
            </View>
        </ScrollView>
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
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    textinput: {
        width: Dimensions.get('window').width * 0.84,
        height: Dimensions.get('window').height * 0.06,
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 10,
        padding: 10
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

export default RegisterScreen;