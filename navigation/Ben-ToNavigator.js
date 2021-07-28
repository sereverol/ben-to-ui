import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

import Colors from '../constants/Colors';

const BenToNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: Home,
    },
  }
  // { mode: 'modal' }
);

export default createAppContainer(BenToNavigator);
