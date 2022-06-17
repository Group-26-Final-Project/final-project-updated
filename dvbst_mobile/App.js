import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import MainContainer from './navigation/MainContainer';
import AuthContainer from './navigation/AuthContainer';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
// const token = await AsyncStorage.getItem("token")
import deviceStorage from './services/deviceStorage';
import { useEffect } from 'react';

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  const authState = useSelector((state) => state.authState)
  console.log(authState)
  // useEffect(() => {
  //   deviceStorage.getItem()
  // })
  return (
    <SafeAreaView  style={styles.container}>
      {/* <MainContainer/> */}
      {authState.token ? <AuthContainer/> : <MainContainer/>}
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});