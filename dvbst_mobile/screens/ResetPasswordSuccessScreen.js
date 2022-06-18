import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';

const ResetPasswordSuccessScreen = (props) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text>Password reset was successful!</Text>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Back to Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 40,
        backgroundColor: '#fff',
        justifyContent: 'center'
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

export default ResetPasswordSuccessScreen;