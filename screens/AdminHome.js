import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import Http from '../service/Http';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Field from '../util/Field';
import MainButton from '../components/MainButton';

const AdminHome = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const asyncFunctionData = async () => {
      try {
        const storageData = await AsyncStorage.getItem('user');
        setData(JSON.parse(storageData));
      } catch (e) {}
    };
    asyncFunctionData();
  }, [setData]);

  // const [user, setUser] = useState();

  // useEffect(() => {
  //   fetchData();
  //   return () => {
  //     console.log('done');
  //   };
  // }, [user]);

  // const fetchData = async () => {
  //   const data = await AsyncStorage.getItem('user');
  //   const value = await JSON.parse(data);
  //   await setUser(value);
  //   console.log(user);
  // };

  const goOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      props.navigation.replace('Login');
      return true;
    } catch (exception) {
      return false;
    }
  };

  const goToAddEstablishment = () => {
    props.navigation.navigate('AddEstablishment');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={{ textAlign: 'left', padding: 10, fontSize: 20 }}>
        Welcome {data.name} !
      </Text>
      <Card
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          width: 340,
        }}
        onPress={() => goToAddEstablishment()}
      >
        <Text>Click here to add establishments and products</Text>
      </Card>
      <Card
        style={{
          width: 340,
          marginTop: 190,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
        onPress={() => goOut()}
      >
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 30,
          }}
        >
          Go To Login
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  Header: {
    marginTop: 24,
    backgroundColor: 'white',
    padding: '2%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },

  inputText: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'gray',
  },
  saveButton: {
    padding: '2%',
    paddingVertical: '3%',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: '5%',
    borderColor: '#3465d9',
  },
  body: {
    flex: 1,
    paddingHorizontal: '3%',
    backgroundColor: '#f4f6fc',
  },
});

export default AdminHome;
