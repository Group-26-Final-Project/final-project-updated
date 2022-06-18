import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import LoginScreen from '../screens/LoginScreen'
import RegistrationScreen from '../screens/RegisterScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ConfirmCodeScreen from '../screens/ConfirmCodeScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ResetPasswordSuccessScreen from '../screens/ResetPasswordSuccessScreen';

//Screen names
const loginName = "Login";
const registerName = "Register";
const forgotName = "ForgotPassword";
const confirmName = "ConfirmCode";
const resetName = "ResetPassword";
const successName = "ResetSuccess";

const Stack = createStackNavigator();


function ResetPasswordStack() {
    return (
        <Stack.Navigator
            initialRouteName={forgotName}
            screenOptions={{
                headerTitle: "",
                headerTransparent: true,
                headerShown: false,
                headerBackVisible:false
            }}
        >
            <Stack.Screen
                name={forgotName}
                component={ForgotPasswordScreen}
            />
            <Stack.Screen
                name={confirmName}
                component={ConfirmCodeScreen}
            />
            <Stack.Screen
                name={resetName}
                component={ResetPasswordScreen}
            />
            <Stack.Screen
                name={successName}
                component={ResetPasswordSuccessScreen}
            />
        </Stack.Navigator>
    )
}

function AuthContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={loginName}
                screenOptions={{
                    headerTitle: "",
                    headerTransparent: true
                }}
            >
                <Stack.Screen name="resetPassStack" component={ResetPasswordStack} />
                <Stack.Screen name={loginName} component={LoginScreen} />
                <Stack.Screen name={registerName} component={RegistrationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthContainer;