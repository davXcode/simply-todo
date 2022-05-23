import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import Header from './src/components/Header';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import UpdateData from './src/components/updateData';

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
        .then((res) => {
          console.log(res);
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
      setTodoItem('');
      fetchData();
    } else {
      alert("There's no system safe");
    }
  }

  //delete
  function deleteData(par1) {
    axios
      .delete(
        `https://api.kontenbase.com/query/api/v1/5ad2e50c-b9dc-48a9-a743-4229807ee0ef/todos/${par1}`
      )
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch(() => {
        alert('Error Delete Data');
      });
  }

  //popup delete
  const [updateData, setUpdateData] = useState(false);
  function toggleUpdateData() {
    setUpdateData(true);
  }

  function toggleUpdateDataClose() {
    setUpdateData(false);
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
        <FlatList
          data={todoList}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.todoItem,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Modal
                animationType="slide"
                visible={updateData}
                onRequestClose={() => toggleUpdateDataClose()}
              >
                <UpdateData
                  closeModal={toggleUpdateDataClose}
                  identity={item._id}
                />
              </Modal>

              <TouchableOpacity onPress={() => toggleUpdateData()}>
                <AntDesign
                  name="edit"
                  size={20}
                  style={{
                    color: 'blue',
                  }}
                ></AntDesign>
              </TouchableOpacity>
              <Text style={{}}>{item.todoItem}</Text>
              <TouchableOpacity onPress={() => deleteData(item._id)}>
                <AntDesign
                  name="delete"
                  size={20}
                  style={{
                    color: 'red',
                  }}
                ></AntDesign>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 60,
    display: 'flex',
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
    textAlign: 'center',
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
