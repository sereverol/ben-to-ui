import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';

import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';

const Login = (props) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  let passInput = '';

  // const submitSignIn = async () => {
  //   setLoading(true);
  //   if (!Field.checkFields([user.email, user.password])) {
  //     Alert.alert('Empty Field', 'Please, fill the fields');
  //   } else {
  //     const data = await Http.send('POST', '/api/users/signin', user);

  //     if (!data) {
  //       Alert.alert('Fatal Error', 'No data from server...');
  //     } else {
  //       switch (data.typeResponse) {
  //         case 'Success':
  //           await AsyncStorage.setItem('user', JSON.stringify(data.body[0]));
  //           navigation.navigate('Home', data.body[0]);
  //           break;

  //         case 'Fail':
  //           data.body.errors.forEach((element) => {
  //             ToastAndroid.showWithGravity(
  //               element.text,
  //               ToastAndroid.SHORT,
  //               ToastAndroid.TOP
  //             );
  //           });
  //           break;

  //         default:
  //           Alert.alert(data.typeResponse, data.message);
  //           break;
  //       }
  //     }
  //   }

  //   setLoading(false);
  // };

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
          <Text style={styles.subtitle}>Sign In</Text>
          <Text style={styles.subtitle}>Welcome Again to Ben-To!</Text>

          <View style={styles.section}>
            <Ionicons name="person" size={20} color="black" />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType={'email-address'}
              blurOnSubmit={false}
              style={styles.textInput}
              autoFocus
              onChangeText={(email) => setUser({ ...user, email: email })}
              onSubmitEditing={() => passInput.focus()}
            />
          </View>
          <View style={styles.section}>
            <Ionicons name="ios-lock-closed" size={20} color="black" />
            <TextInput
              ref={(input) => (passInput = input)}
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              secureTextEntry
              onChangeText={(password) =>
                setUser({ ...user, password: password })
              }
              // onSubmitEditing={submitSignIn}
            />
          </View>

          <MainButton onPress={() => console.log(user)}>Sign In</MainButton>
          {/* <TouchableOpacity onPress={submitSignIn} style={signInStyles.signIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#00ff00" />
          ) : (
            <Text style={signInStyles.textSignIn}>Sign In</Text>
          )}
        </TouchableOpacity> */}
          <View style={styles.signUp}>
            <Text style={styles.textSignUp}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.replace('Register')}
            >
              <Text
                style={[
                  styles.textSignUp,
                  { color: Colors.cinco, marginLeft: 3 },
                ]}
              >
                Sign Up
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

export default Login;
