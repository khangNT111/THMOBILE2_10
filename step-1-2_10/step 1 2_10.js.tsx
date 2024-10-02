import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons
import { TextInput } from 'react-native-web'; // Or `react-native` if you're targeting native apps

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  // Fetch users from API using axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://66fcb8cdc3a184a84d17c56e.mockapi.io/USER');
      setUsers(response.data);  // Assuming the API returns an array of users with id and name
      setLoading(false);
    } catch (error) {
      Alert.alert('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component is mounted
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('https://66fcb8cdc3a184a84d17c56e.mockapi.io/USER', { name: name });
      if (response && response.status === 201) {
        console.log('User ADĐ:', response.data);
        fetchUsers();
        setName("");
      } else {
        Alert.alert('Error add user');
      }
    } catch (error) {
      console.log('Error add user:', error);
      Alert.alert('Error add user');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://66fcb8cdc3a184a84d17c56e.mockapi.io/USER/${id}`);
      console.log(response);
      if (response && response.status === 200) {
        console.log('User delete:', response.data);
        fetchUsers();
      } else {
        Alert.alert('Error delete user');
      }
    } catch (error) {
      console.log('Error delete user:', error);
      Alert.alert('Error delete user');
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setId(item.id);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://66fcb8cdc3a184a84d17c56e.mockapi.io/USER/${id}`, { name });
      console.log(response);
      if (response && response.status === 200) {
        console.log('User updated ');
        fetchUsers();
      } else {
        Alert.alert('Error update user');
      }
    } catch (error) {
      console.log('Error update user:', error);
      Alert.alert('Error update user');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.item}>
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
      </View>
      <View style={styles.iconButtons}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Icon name="edit" size={30} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="delete" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.iconButton} onPress={handleAdd}>
          <Icon name="person-add" size={30} color="green" />
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleUpdate}>
          <Icon name="update" size={30} color="blue" />
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        PERSONLIST
      </Text>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 10,
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  flatList: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
