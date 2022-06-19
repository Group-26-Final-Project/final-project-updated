import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeData = async () => {
    try {
        const value = await AsyncStorage.removeItem('token')
        console.log("Value", value)
        return value
    } catch (e) {
        return e
        // error reading value
    }
}
