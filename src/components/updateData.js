import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';

function deleteData(par1) {
  axios
    .patch(
      `https://api.kontenbase.com/query/api/v1/5ad2e50c-b9dc-48a9-a743-4229807ee0ef/todos/${par1}`
    )
    .then((res) => {
      console.log(res);
      fetchData();
    })
    .catch(() => {
      alert('Error Update Data');
    });
}

export default class updateData extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: 'absolute', top: 64, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
          <Text style={styles.title}>Update To-do Lists</Text>
          <TextInput style={styles.input} placeholder="update Data" />

          <TouchableOpacity
            style={[styles.create, { backgroundColor: 'red' }]}
            onPress={this.createTodo}
          >
            <Text style={{ color: 'white', fontWeight: '600' }}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'black',
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'blue',
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
