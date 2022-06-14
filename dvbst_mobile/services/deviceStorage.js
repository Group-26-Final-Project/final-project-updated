import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
    async saveItem(value) {
        try {
            await AsyncStorage.setItem("token", value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async getItem() {
        return await AsyncStorage.getItem("token");
    }
};

export default deviceStorage ;