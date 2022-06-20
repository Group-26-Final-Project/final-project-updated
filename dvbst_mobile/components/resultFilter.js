import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux'
import { getElection, getElections } from '../features/electionsSlice';

const customFonts = {
  poppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
  poppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  poppinsSemi: require('../assets/fonts/Poppins-SemiBold.ttf'),
}

const ResultFilter = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoaded] = useFonts(customFonts);
  const electionsState = useSelector((state) => state.electionsState)
  const dispatch = useDispatch()

  const extractElections = (data) => {
    var electionsData = [];
    if (data && data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var element = {
          label:data[i].name,
          value:data[i]._id,
        };
        electionsData.push(element);
      }
    }
    return electionsData;
  };

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {electionsState.getElectionStatus === 'pending' && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color='#00d05a' />
          </View>
        )}
        {electionsState.getElectionStatus === 'failed' && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>Ooops something went wrong</Text>
          </View>
        )}
        {(electionsState.getElectionStatus !== 'pending') && (
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={extractElections(props.elections)}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Choose Election'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              dispatch(getElection(item.value))
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 20
  },
  dropdown: {
    width: 350,
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 2,
    backgroundColor: '#D3E8E6B3',
  },
  placeholderStyle: {
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: 'poppinsRegular',
    color: 'rgba(0,0,0,0.8)',
    paddingLeft: 10
  },
  selectedTextStyle: {
    fontSize: 15,
    fontFamily: 'poppinsRegular',
    color: 'rgba(0,0,0,0.8)',
    paddingLeft: 10
  },
  iconStyle: {
    width: 35,
    height: 35,
  },
});

export default ResultFilter;