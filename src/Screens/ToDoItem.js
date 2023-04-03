import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from 'react-native-check-box';

const TodoItem = ({item}) => {
  const [completed, setCompleted] = useState(false);
  return (
    <View style={styles.item}>
      <CheckBox
        isChecked={completed}
        onClick={() => setCompleted(!completed)}
      />
      <Text style={[styles.text, completed && styles.completedText]}>
        {item.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#189AB4',
    borderRadius: 4,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: 'orange',
  },
  text: {
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
});

export default TodoItem;
