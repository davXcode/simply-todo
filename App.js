import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from './src/components/Header';
import axios from 'axios';

export default function App() {
  const [todoItem, setTodoItem] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // get
  function fetchData() {
    axios
      .get(
        'https://api.kontenbase.com/query/api/v1/5ad2e50c-b9dc-48a9-a743-4229807ee0ef/todos'
      )
      .then((res) => {
        setTodoList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  // post
  function postData(text) {
    if (todoItem !== '') {
      axios
        .post(
          'https://api.kontenbase.com/query/api/v1/5ad2e50c-b9dc-48a9-a743-4229807ee0ef/todos',
          {
            todoItem: text,
          }
        )
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
        });
      setTodoItem('');
    } else {
      alert("There's no system safe");
    }
  }

  return (
    <View>
      <Header title="Sic Mundus Creatus Est - davXcode" />
      <View style={styles.container}>
        <View>
          {/* input */}
          <TextInput
            placeholder="Enter To-Do item"
            style={styles.textInput}
            onChangeText={(text) => setTodoItem(text)}
            value={todoItem}
          />
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => postData(todoItem)}
          >
            <Text style={styles.button}>Add Todo</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {todoList.map((todo) => (
            <View style={styles.todoItem}>
              <Text key={todo - id} style={{ textAlign: 'center' }}>
                {todo.todoItem}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 60,
  },
  textInput: {
    padding: 10,
    borderColor: '#000000',
    marginBottom: 10,
    borderWidth: 1,
  },
  todoItem: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  button: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonAdd: {
    backgroundColor: 'pink',
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
    padding: 5,
  },
});
