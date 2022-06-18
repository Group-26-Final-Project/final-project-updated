import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';

const ResetPasswordSuccessScreen = (props) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text>Password reset was successful!</Text>
            <Button title='Go to Login Page' onPress={()=>navigation.navigate("Login")}/>
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
});

export default ResetPasswordSuccessScreen;