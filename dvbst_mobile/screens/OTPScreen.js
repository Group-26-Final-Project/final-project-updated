import React, { useState } from 'react'

import { StyleSheet, SafeAreaView } from 'react-native';
import OtpHeader from '../components/otpHeader';
import OtpBody from '../components/otpBody';
import { useNavigation } from '@react-navigation/native';


const OTPScreen = (props) => {
    const [otp, setOtp] = useState('')
    const [otpReady, setOtpReady] = useState(false)
    const { email } = props.route.params.params;
    const MAX_OTP_LENGTH = 6;
    return (
        <SafeAreaView style={styles.container}>
            <OtpHeader />
            <OtpBody
                email={email}
                setOtpReady={setOtpReady}
                otp={otp}
                setOtp={setOtp}
                maxLength={MAX_OTP_LENGTH}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 40,
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
})

export default OTPScreen;