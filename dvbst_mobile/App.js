import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import MainContainer from './navigation/MainContainer';
import AuthContainer from './navigation/AuthContainer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './app/store';
// const token = await AsyncStorage.getItem("token")
import deviceStorage from './services/deviceStorage';
import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { getUser } from './features/userSlice';

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)
  const dispatch = useDispatch()

  console.log(authState)
  // console.log(authState)
  useEffect(() => {
    dispatch(getUser(authState.id))
  }, [dispatch, authState.id])

  console.log(userState.user)

  return (
    <SafeAreaView style={styles.container}>
      {/* <MainContainer/> */}
      {authState.token ?
        <PaperProvider>
          <MainContainer />
        </PaperProvider> : <AuthContainer />}
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});