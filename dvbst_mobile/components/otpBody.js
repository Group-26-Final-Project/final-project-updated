import React, { useState, useRef, useEffect } from 'react'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { verifyOTP } from '../features/votingSlice';
import { useNavigation } from '@react-navigation/native';

const customFonts = {
    poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    poppinsThin: require('../assets/fonts/Poppins-Thin.ttf'),
    poppinsSemi: require('../assets/fonts/Poppins-SemiBold.ttf'),
}

export default OTPBody = ({ email, setOtpReady, otp, setOtp, maxLength }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const codeDigitsArray = new Array(maxLength).fill(0)
    const textInputRef = useRef(null)
    const [isLoaded] = useFonts(customFonts);
    const [isFocused, setIsFocused] = useState(false)
    const [otpError, setOtpError] = useState(null)

    const toCodeDigitInput = (_value, index) => {
        const emptyInputChar = " "
        const digit = otp[index] || emptyInputChar

        const isCurrentDigit = index === otp.length;
        const isLastDigit = index === maxLength - 1;
        const isCodeFull = otp.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)

        return (
            <View style={(isFocused && isDigitFocused) ? styles.otpInputFocus : styles.otpInput} key={index}>
                <Text style={styles.otpInputText}>{digit}</Text>
            </View>
        )
    }

    const handlePress = () => {
        setIsFocused(true)
        textInputRef?.current?.focus();
    }

    const handleOnBlur = () => {
        setIsFocused(false)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length === maxLength) {
            dispatch(verifyOTP({email,otp}))
            .unwrap()
            .then((response) => {
                if (response.data.status === 'approved'){
                    navigation.replace("Voting")
                    setOtpError(null)
                } else {
                    setOtpError("Wrong OTP Found")
                }
            })
            .catch((e) => {
                console.log("Verify Error:", e)
            })
        } else {
            setFormErrors(errors);
        }
    }

    // useEffect(() => {
    //     setOtpReady(otp.length === maxLength)
    //     return () => setOtpReady(false)
    // }, [otp])

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.otp}>
                        <Pressable onPress={handlePress} style={styles.otpInputContainer}>
                            {codeDigitsArray.map(toCodeDigitInput)}
                        </Pressable>
                    </View>
                    <TextInput
                        ref={textInputRef}
                        value={otp}
                        onChangeText={setOtp}
                        maxLength={maxLength}
                        keyboardType="number-pad"
                        returnKeyType='done'
                        textContentType='oneTimeCode'
                        onBlur={handleOnBlur}
                        style={styles.hiddenOtpInput} />

                </View>
                <Text style={{color: '#ff0000', alignSelf: 'center'}}>{otpError}</Text>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.quest}>Didn't receive an OTP?</Text>
                        <Text style={styles.resend}>Resend OTP</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    otp: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpInputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    otpInput: {
        minWidth: '15%',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#00D05A20'
    },
    otpInputFocus: {
        minWidth: '15%',
        borderColor: '#000',
        backgroundColor: '#00D05A20',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12
    },
    hiddenOtpInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
    otpInputText: {
        //text
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    quest: {
        fontFamily: 'poppinsThin',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
        color: '#2F313D',
    },
    resend: {
        color: '#2F313D',
        fontFamily: 'poppinsSemi',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 50,
        textDecorationLine: 'underline'
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#00d05a',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        letterSpacing: 1,
        fontFamily: 'poppinsRegular'
    }
})