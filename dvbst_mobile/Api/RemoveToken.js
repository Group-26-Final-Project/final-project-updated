import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeData = async () => {
    try {
        const value = await AsyncStorage.removeItem('token')
        return value
    } catch (e) {
        return e
        // error reading value
    }
}
