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

import Http from '../service/Http';
import ProductGridTile from '../components/ProductGridTile';

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
        <FormCard
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 380,
            height: 700,
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: imageurl,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>{description}</Text>
            <Text>{price}</Text>
          </View>

          <View style={{ width: 380 }}>
            <Text
              style={{
                marginTop: 5,
                fontSize: 20,
                textAlign: 'left',
                paddingLeft: 5,
              }}
            >
              Products:
            </Text>
          </View>
        </FormCard>
      </View>
    </View>
  );
};

Products.navigationOptions = (navigationData) => {
  const headerName = navigationData.navigation.getParam('productName');

  return {
    headerTitle: headerName,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
