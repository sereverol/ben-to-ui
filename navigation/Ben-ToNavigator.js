import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import AdminHome from '../screens/AdminHome';
import AddProducts from '../screens/AddProducts';
import Establishments from '../screens/Establishments';
import AddEstablishment from '../screens/AddEstablishment';
import Products from '../screens/Products';
import Cart from '../screens/Cart';

// import { PaymentScreen } from '../screens/Payment';

import Payment from '../screens/Payment';
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
    Admin: {
      screen: AdminHome,
    },
    AddEstablishment: {
      screen: AddEstablishment,
    },
    AddProducts: {
      screen: AddProducts,
    },
    Establishments: {
      screen: Establishments,
    },
    Products: {
      screen: Products,
    },
    Home: {
      screen: Home,
    },
    // Mapas: {
    //   screen: MapScreen,
    //   navigationOptions: {
    //     headerShown: false,
    //   },
    // },
    Cart: {
      screen: Cart,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

// const BenToNavigator = createStackNavigator(
//   {
//     Home: {
//       screen: Home,
//     },
//     AdminHome: {
//       screen: AdminHome,
//     },
//   }
//   // { mode: 'modal' }
// );

// const HomeAdminStack = createStackNavigator({
//   // For header options
//   HomeAdmin: {
//     screen: AdminHome,
//     navigationOptions: {
//       headerTitle: 'Admin Home',
//     },
//   },
//   AddProducts: {
//     screen: AddProducts,
//   },
//   AddEstablishment: {
//     screen: AddEstablishment,
//     navigationOptions: {
//       headerTitle: 'Establishments!',
//     },
//   },
// });

// const BenToAdminTab = createBottomTabNavigator(
//   {
//     HomeAdmin: {
//       screen: HomeAdminStack,
//       navigationOptions: {
//         tabBarLabel: 'Home',
//         tabBarIcon: ({ tintColor }) => {
//           return <Ionicons name="home" size={20} color={tintColor} />;
//         },
//       },
//     },
//     Places: {
//       screen: Establishments,
//       navigationOptions: {
//         headerTitle: 'Establishments',
//         tabBarIcon: ({ tintColor }) => {
//           return <Ionicons name="restaurant" size={20} color={tintColor} />;
//         },
//       },
//     },
//   },
//   {
//     initialRouteName: 'HomeAdmin',
//   },

//   {
//     tabBarOptions: {
//       style: {
//         backgroundColor: 'transparent',
//         borderRadius: 20,

//         position: 'relative',
//         left: 0,

//         borderTopColor: 'rgba(255, 255, 255, 0.65)',

//         right: 0,
//         overflow: 'visible',
//       },
//       tabStyle: {
//         borderColor: 'rgba(255, 255, 255, 0.65)',
//         borderRightWidth: 0.5,
//       },
//       activeTintColor: 'black',
//     },
//   }
// );

// const MainNavigation = createSwitchNavigator({
//   // AuthStack: AuthStackNavigation, // You will use this.props.navigation.replace('HomeDrawer') after login process.

// });

// const BenToNavigator = createAppContainer(MainNavigation);

export default createAppContainer(BenToNavigator);
