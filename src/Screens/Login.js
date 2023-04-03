import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = () => {
    //
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot.docs);
        if (querySnapshot.docs.length > 0) {
          if (
            querySnapshot.docs[0]._data.email != email &&
            querySnapshot.docs[0]._data.password != password
          ) {
            Alert.alert('Invalid Credentials');
          }
          console.log(
            querySnapshot.docs[0]._data.email +
              ' ' +
              querySnapshot.docs[0]._data.password,
          );
          navigation.navigate('HomeScreen');
        } else {
          console.log('account not found');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: '700', marginBottom: 30}}>
        Welcome to ToDo App
      </Text>
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
          checkLogin();
        }}>
        <Text style={{fontSize: 25, fontWeight: '500'}}>Login</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          marginTop: 30,
          textDecorationLine: 'underline',
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Create New Account
      </Text>
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
export default Login;
