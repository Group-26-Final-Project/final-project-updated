import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

export default function AppBar() {
    return (
        <Appbar.Header style={styles.bar} >
            <Appbar.Action icon='dots-vertical' onPress={() => {console.log("Here")}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: '#00d05a',
        height: '20%',
        maxWidth: '100%'
    }
})