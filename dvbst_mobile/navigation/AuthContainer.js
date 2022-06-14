import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';

// Screens
import LoginScreen from '../screens/LoginScreen'
import OTPScreen from '../screens/OTPScreen'
import RegistrationScreen from '../screens/RegisterScreen'

//Screen names
const loginName = "Login";
const registerName = "Register";
const otpName = "Otp";

const Stack = createStackNavigator();

function LoginStack() {
    return (
        <Stack.Navigator
            initialRouteName={loginName}
            screenOptions={{
                headerTitle: "",
                headerTransparent: true
            }}
        >
            <Stack.Screen
                name={loginName}
                component={LoginScreen}
            />
            <Stack.Screen
                name={otpName}
                component={OTPScreen}
            />
        </Stack.Navigator>
    )
}

function AuthContainer() {
    const linking = {
      prefixes: [Linking.createURL('/'), 'https://62a8f852b895971ca483f82f--tubular-churros-16cbaf.netlify.app'],
    };
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator
                initialRouteName="loginStack"
                screenOptions={{
                    headerTitle: "",
                    headerTransparent: true
                }}
                >
                <Stack.Screen name="loginStack" component={LoginStack} />
                <Stack.Screen name={registerName} component={RegistrationScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthContainer;