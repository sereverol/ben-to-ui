import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import MainButton from '../components/MainButton';
import FormCard from '../components/FormCard';

import Http from '../services/Http';
import ProductGridTile from '../components/ProductGridTile';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const Products = (props) => {
  const name = props.navigation.getParam('productName');
  const price = props.navigation.getParam('productPrice');
  const description = props.navigation.getParam('productDescription');
  const id = props.navigation.getParam('productId');
  const imageurl = props.navigation.getParam('productImageURL');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lotData, setLotData] = useState();

  let res = [];

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            marginVertical: '70%',
          }}
        >
          <FormCard style={{ height: 170 }}>
            <Text style={{ fontSize: 20, padding: 10 }}>
              Add a {name} to your cart!{' '}
            </Text>
            <Text style={{ textAlign: 'center' }}> {description}</Text>

            <View style={{ marginTop: 5 }}>
              <MainButton>Add ${price}</MainButton>
            </View>
          </FormCard>
        </View>
      </View>
    </View>
  );
};

Products.navigationOptions = (navigationData) => {
  const headerName = navigationData.navigation.getParam('productName');

  return {
    headerTitle: headerName,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName="cart"
          onPress={() => {
            navigationData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,

    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default Products;
