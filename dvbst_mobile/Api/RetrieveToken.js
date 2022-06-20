import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        return value
    } catch (e) {
        return e
        // error reading value
    }
}
