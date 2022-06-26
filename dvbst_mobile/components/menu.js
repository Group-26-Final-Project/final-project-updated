import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button, Provider } from 'react-native-paper';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Menu,
    MenuContext,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

export const MenuExample = ({ role, navigation }) => {
    const dispatch = useDispatch()
    return (
        <MenuProvider style={styles.container} >
            <Menu>
                <MenuTrigger>
                    <Material name='dots-vertical' size={30} color={'#000'} />
                </MenuTrigger>

                {/* <MenuTrigger text='Select action' /> */}
                <MenuOptions customStyles={{ optionsContainer: styles.container }} optionsContainerStyle={{ width: 200 }} >
                    {role === 'candidate' && (
                        <MenuOption onSelect={() => navigation.navigate('Request')} text='Make Request' />
                    )}
                    <MenuOption onSelect={()=>dispatch(logout())} >
                        <Text style={{ color: 'red' }}>Logout</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </MenuProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingRight: 50,
        // marginRight: 50
        // backgroundColor: '#ecf0f1',
    },
});

// const MenuExample = () => {
//     const [visible, setVisible] = useState(false);

//     const closeMenu = () => setVisible(false);
//     const openMenu = (v) => setVisible(true);
//     return (
//         <Provider>
//             <View style={styles.container}>
//                 <Menu
//                     visible={visible}
//                     onDismiss={closeMenu}
//                     anchor={
//                         <Button onPress={openMenu}>
//                             <Material name='dots-vertical' size={30} color={'#000'} />
//                         </Button>
//                     }>
//                     <Menu.Item
//                         onPress={() => {
//                             console.log("Profile")
//                             // Alert.alert('Action : ', 'Print');
//                         }}
//                         title="Edit Profile"
//                     />
//                     <Menu.Item
//                         onPress={() => {
//                             console.log("Logout")
//                             // Alert.alert('Action : ', 'Forward');
//                         }}
//                         title="Logout"
//                     />
//                     <Menu.Item
//                         onPress={() => {
//                             console.log("Logout")
//                             // Alert.alert('Action : ', 'Forward');
//                         }}
//                         title="Logout"
//                     />
//                 </Menu>
//             </View>
//         </Provider>
//     );
// };

export default MenuExample;

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         height: 200,
//     },
// });