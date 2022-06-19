import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar, Menu, onDismissMenu, isMenuVisible } from 'react-native-paper'
import MenuExample from '../components/menu'
import { CustomMenu } from '../components/CustomMenu'
import { Alert, Image, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

// Screens
import HomeScreen from '../screens/HomeScreen';
import IdeasScreen from '../screens/IdeasScreen';
import SuggestionScreen from '../screens/SuggestIdeaScreen';
import VotingScreen from '../screens/VotingScreen';
import ResultScreen from '../screens/ResultScreen';
import CandidatesScreen from '../screens/CandidateScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AppBar from '../components/appBar';
import StackHeader from '../components/StackHeader';

//Screen names
const homeName = "Home";
const ideaName = "Ideas";
const suggestName = "Suggestion";
const votingName = "Voting";
const resultName = "Results";
const candidateName = "Candidates";
const profileName = "EditProfile"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack(){
  return (
    <Stack.Navigator
      initialRouteName={homeName}
      screenOptions={{
        headerTitle: "",
        headerTransparent: true
      }}
    >
      <Stack.Screen
        name={homeName}
        component={HomeScreen}
      />
      <Stack.Screen
        name={profileName}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  )
}

function VotingStack() {
  return (
    <Stack.Navigator
      initialRouteName={votingName}
      screenOptions={{
        headerTitle: "",
        headerTransparent: true
      }}
    >
      <Stack.Screen
        name={votingName}
        component={VotingScreen}
      />
      <Stack.Screen
        name={candidateName}
        component={CandidatesScreen}
      />
      <Stack.Screen
        name={profileName}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  )
}

function IdeaStack() {
  return (
    <Stack.Navigator
      initialRouteName={ideaName}
      screenOptions={{
        headerTitle: "",
        headerTransparent: true
      }}
    >
      <Stack.Screen
        name={ideaName}
        component={IdeasScreen}
      />
      <Stack.Screen
        name={suggestName}
        component={SuggestionScreen}
      />
      <Stack.Screen
        name={profileName}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  )
}


function ResultStack(){
  return (
    <Stack.Navigator
      initialRouteName={resultName}
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
        headerShown: true
      }}
    >
      <Stack.Screen
        name={resultName}
        component={ResultScreen}
      />
      <Stack.Screen
        name={profileName}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  )
}

function MainContainer() {
  const userState = useSelector((state) => state.userState)
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === resultName) {
              iconName = focused ? 'vote' : 'vote-outline';

            } else if (rn === votingName) {
              iconName = focused ? 'vote' : 'vote-outline';

            } else if (rn === ideaName) {
              iconName = focused ? 'lightbulb-on' : 'lightbulb-on-outline';
            }
            // You can return any component that you like here!
            return <Material name={iconName} size={size} color={color} />;
          },

          tabBarActiveBackgroundColor: '#242632',
          tabBarInactiveBackgroundColor: '#242632',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#ffffff87',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { height: 70 },
          headerStyle: {
            backgroundColor: '#00d05a'
          },
          headerTitle: "",
          // headerRight: () => <StackHeader navigation={navigation}/>
          headerRight: () => <MenuExample role={userState?.user?.role} navigation={navigation} />
          // () => 
          //   <TouchableOpacity>
          //     <MenuExample/>
          //     {/* <Text>
          //       Hello
          //     </Text> */}
          //     {/* <Material name='dots-vertical' size={30} color={'#fff'} /> */}
          //   </TouchableOpacity>

        })}>

        <Tab.Screen name={homeName} component={HomeStack} />
        <Tab.Screen name={votingName} component={VotingStack} />
        <Tab.Screen name={ideaName} component={IdeaStack} />
        <Tab.Screen name={resultName} component={ResultStack} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;