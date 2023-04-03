import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
let token = '';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = async () => {
    token = await messaging().getToken();
    console.log(token);
  };

  const saveData = () => {
    firestore()
      .collection('Users')
      .add({
        name: name,
        email: email,
        password: password,
        token: token,
      })
      .then(() => {
        console.log('User added!');
      });
    firestore()
      .collection('tokens')
      .add({
        token: token,
        email: email,
      })
      .then(() => {
        console.log('User Added !');

        saveLocalData();
        navigation.goBack();
      });

    const saveLocalData = async () => {
      await AsyncStorage.setItem('Name', name);
      await AsyncStorage.setItem('Email', email);
    };
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: '700', marginBottom: 30}}>
        Welcome to ToDo App
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={txt => {
          setEmail(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={txt => {
          setPassword(txt);
        }}
      />
      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          backgroundColor: 'orange',
          marginTop: 30,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          saveData();
        }}>
        <Text style={{fontSize: 25, fontWeight: '500'}}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#189AB4',
  },

  input: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 4,
    padding: 8,
    paddingLeft: 20,
    width: '80%',
    height: 50,
    marginBottom: 16,
  },
});
export default Signup;
