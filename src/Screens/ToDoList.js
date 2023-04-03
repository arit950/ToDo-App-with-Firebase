import React from 'react';
import {FlatList} from 'react-native';
import TodoItem from './ToDoItem';

const TodoList = ({todos}) => {
  return (
    <FlatList
      data={todos}
      renderItem={({item}) => <TodoItem item={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default TodoList;
