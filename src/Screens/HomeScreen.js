import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import TodoList from './ToDoList';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    const newTodo = {
      id: Math.random().toString(),
      text: text,
    };
    setTodos([...todos, newTodo]);
    setText('');
    getAllToken();
  };
  const getAllToken = () => {
    let tempToken = [];
    firestore()
      .collection('tokens')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          sendNotifications(documentSnapshot.data().token);
        });
        sendNotifications(tempToken);
      });
  };
  const sendNotifications = async token => {
    var axios = require('axios');
    var data = JSON.stringify({
      data: {},
      notification: {
        body: 'click to check new ToDo',
        title: 'New ToDo Added',
      },
      to: token,
    });
    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization:
          'key=AAAAce0APlg:APA91bFWu7c4qShsWlxioCgOorusQlC-SSymFNyaf5TVKjWgNiTJzRTA2ubQ-9uJosVcCxq2FfUHTDaUi7qMc_UJmmfgWuJ61xqcHf9XoFf0D9BSrP8g5SAX2Yr58tvhN3oYQ28vPmIK',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Enter a todo "
      />
      <Button title="Add ToDO" onPress={handleAddTodo} />
      <TodoList todos={todos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    paddingTop: 50,
    backgroundColor: '#189AB4',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
