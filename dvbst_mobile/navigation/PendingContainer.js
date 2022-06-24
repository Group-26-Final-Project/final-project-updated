import React from 'react';
import { ActivityIndicator, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import MenuExample from '../components/menu'
import { useDispatch, useSelector } from 'react-redux';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import PendingScreen from '../screens/PendingScreen';
import EditProfileScreen from '../screens/EditProfileScreen'

//Screen names
const pendingName = "Pending";
const profileName = "EditProfile";

const Stack = createStackNavigator();

function PendingContainer() {
    const userState = useSelector((state) => state.userState)
    const authState = useSelector((state) => state.authState)

    const onClick = () => {
      dispatch(getUser(authState.id))
    }
    
    return (
        <NavigationContainer>
            {userState.getUserStatus === "pending" && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='#00d05a' />
                </View>
            )}
            {userState.getUserStatus === "failed" && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Somethint Went Wrong!</Text>
                    <Button title='Refresh' onPress={onClick}></Button>
                </View>
            )}
            {userState.getUserStatus === "success" && (

                <Stack.Navigator
                    initialRouteName={pendingName}
                    screenOptions={({ route, navigation }) => ({
                        headerTitle: "",
                        // headerTransparent: true,
                        headerTitle: "",
                        // headerRight: () => <StackHeader navigation={navigation}/>
                        headerRight: () => <MenuExample role={userState?.user?.role} navigation={navigation} />
                    })}>
                    <Stack.Screen name={pendingName} component={PendingScreen} />
                    <Stack.Screen name={profileName} component={EditProfileScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer >
    );
}

export default PendingContainer;