import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  });
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TextStyle}>ToDo APP</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  ViewStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#189AB4',
  },
  TextStyle: {
    fontSize: 60,
    fontWeight: '600',
    color: 'orange',
  },
});

export default Splash;
