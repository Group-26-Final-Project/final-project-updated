import React from 'react';
import { Appbar } from 'react-native-paper';
import { Dimensions } from "react-native";
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

const StackHeader = ({ navigation }) => {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    var width = Dimensions.get('window').width;
    return (
        <Appbar.Header style={{width: width, alignItems: 'center', justifyContent: 'space-between'}}>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Action style={{alignSelf: 'flex-end'}} icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    

        // <Appbar.Header style={{width: 250}}>
        //     <Appbar.BackAction onPress={()=>{}}/>
        //     <Appbar.
        //     <Appbar.Action icon="dots-vertical" onPress={() => console.log("Notification pressed")} />
        // </Appbar.Header>
    )
};

export default StackHeader;