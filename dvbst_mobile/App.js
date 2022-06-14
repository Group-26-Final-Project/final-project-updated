import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import MainContainer from './navigation/MainContainer';
import { Provider } from 'react-redux'
import { store } from './app/store'
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {/* <HomeScreen/> */}
        {/* <LoginScreen/> */}
        <RegisterScreen/>
        {/* <MainContainer /> */}
        <StatusBar style='auto' />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});