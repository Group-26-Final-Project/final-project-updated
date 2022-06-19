import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

export const CustomMenu = (props) => {
    let _menu = null;
    return (
        <View style={props.menustyle}>
            <Menu
                ref={(ref) => (_menu = ref)}
                button={
                    props.isIcon ? (
                        <TouchableOpacity onPress={() => _menu.show()}>
                            <Material name='dots-vertical' size={30} color={'#000'} />
                        </TouchableOpacity>
                    ) : (
                        <Text
                            onPress={() => _menu.show()}
                            style={props.textStyle}>
                            {props.menutext}
                        </Text>
                    )
                }>
                <MenuItem onPress={() => { Alert.alert('PopUp Menu Button Clicked...') }}>
                    Menu Item 1
                </MenuItem>

                <MenuItem disabled>Disabled Menu Item 2</MenuItem>

                <MenuDivider />

                <MenuItem onPress={() => { Alert.alert('PopUp Menu Button Clicked...') }}>
                    Menu Item 3
                </MenuItem>

            </Menu>
        </View>
    );
};
