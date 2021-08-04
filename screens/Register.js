import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';

import Http from '../services/Http';
import Field from '../util/Field';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';

const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    direction: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  let passInput = '';
  let pass2Input = '';
  let emailInput = '';

  const submitSignUp = async () => {
    // setLoading(true);
    if (
      !Field.checkFields([
        user.name,
        user.direction,
        user.email,
        user.password,
        user.confirmPassword,
      ])
    ) {
      Alert.alert('Empty Field', 'Please, fill the fields');
    } else {
      const data = await Http.send('POST', '/api/users/signup', user);

      if (!data) {
        Alert.alert('Fatal Error', 'No data from server...');
      } else {
        switch (data.typeResponse) {
          case 'Success':
            await AsyncStorage.setItem(
              'user',
              JSON.stringify({
                email: user.email,
                name: user.name,
                id: data.body.id,
              })
            );
            props.navigation.replace('Login');
            // navigation.navigate('Home', {
            //   email: user.email,
            //   name: user.name,
            //   id: data.body.id,
            // });
            break;

          case 'Fail':
            console.log('error');
            break;

          default:
            Alert.alert(data.typeResponse, data.message);
            break;
        }
      }
    }

    // setLoading(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/ben-to.png')}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Ben-To</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.subtitle}>Sign Up</Text>
          <Text style={styles.subtitle}>Welcome to Ben-To!</Text>

          <View>
            <View style={styles.section}>
              <Ionicons name="person" size={20} color="black" />
              <TextInput
                placeholder="Name"
                blurOnSubmit={false}
                style={styles.textInput}
                autoFocus
                onChangeText={(name) => setUser({ ...user, name: name })}
                onSubmitEditing={() => emailInput.focus()}
              />
            </View>
            <View style={styles.section}>
              <Ionicons name="mail" size={20} color="black" />
              <TextInput
                ref={(input) => (emailInput = input)}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType={'email-address'}
                blurOnSubmit={false}
                style={styles.textInput}
                onChangeText={(email) => setUser({ ...user, email: email })}
                onSubmitEditing={() => passInput.focus()}
              />
            </View>
            <View style={styles.section}>
              <Ionicons name="location" size={20} color="black" />
              <TextInput
                ref={(input) => (directionInput = input)}
                placeholder="Direction"
                autoCapitalize="none"
                keyboardType={'default'}
                blurOnSubmit={false}
                style={styles.textInput}
                onChangeText={(direction) =>
                  setUser({ ...user, direction: direction })
                }
                onSubmitEditing={() => passInput.focus()}
              />
            </View>
            <View style={styles.section}>
              <Ionicons name="lock-closed" size={20} color="black" />
              <TextInput
                ref={(input) => (passInput = input)}
                placeholder="Password"
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.textInput}
                secureTextEntry
                onChangeText={(password) =>
                  setUser({ ...user, password: password })
                }
                onSubmitEditing={() => pass2Input.focus()}
              />
            </View>
            <View style={styles.section}>
              <Ionicons name="lock-closed" size={20} color="black" />
              <TextInput
                ref={(input) => (pass2Input = input)}
                placeholder="Confirm Password"
                autoCapitalize="none"
                blurOnSubmit={false}
                style={styles.textInput}
                secureTextEntry
                onChangeText={(password) =>
                  setUser({ ...user, confirmPassword: password })
                }
                onSubmitEditing={() => submitSignUp()}
              />
            </View>
          </View>

          <MainButton onPress={() => submitSignUp()}>Sign Up</MainButton>
          {/* <TouchableOpacity onPress={submitSignIn} style={signInStyles.signIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#00ff00" />
          ) : (
            <Text style={signInStyles.textSignIn}>Sign In</Text>
          )}
        </TouchableOpacity> */}
          <View style={styles.signUp}>
            <Text style={styles.textSignUp}>Already have an account?</Text>
            <TouchableOpacity onPress={() => props.navigation.replace('Login')}>
              <Text
                style={[
                  styles.textSignUp,
                  { color: Colors.cinco, marginLeft: 3 },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100,
  },
  titleContainer: {},
  welcome: {
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: 'shippori-bold',
    fontSize: 30,
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.3,
    marginHorizontal: Dimensions.get('window').width / 5.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    color: Colors.uno,
    fontFamily: 'open-sans',
  },
  section: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    color: Colors.uno,
    paddingLeft: 10,
    fontFamily: 'open-sans',
  },
  inputContainer: {
    marginTop: 65,
  },
  signIn: {
    width: '100%',
    height: 40,
    backgroundColor: '#3465d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  signUp: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textSignUp: {
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'open-sans',
  },
});

export default Register;
