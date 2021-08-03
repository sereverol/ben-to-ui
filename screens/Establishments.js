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

const Establishments = (props) => {
  const name = props.navigation.getParam('establishmentName');
  const budget = props.navigation.getParam('establishmentBudget');
  const description = props.navigation.getParam('establishmentDescription');
  const direction = props.navigation.getParam('establishmentDirection');
  const id = props.navigation.getParam('establishmentId');
  const imageurl = props.navigation.getParam('establishmentImageURL');

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lotData, setLotData] = useState();

  let res = [];

  const getList = async () => {
    // setLoading(true);
    // const id = route.params.id;
    const data = await Http.send('GET', `/api/product/establishment/${id}`);

    if (!data) {
      Alert.alert('Fatal Error', 'No data from server..');
    } else {
      switch (data.typeResponse) {
        case 'Success':
          const body = data.body;
          await setData([body]);
          const dt = data[0];
          await setLotData(dt);
          break;

        case 'Fail':
          data.body.errors.forEach((element) => {});
          break;

        default:
          Alert.alert(data.typeResponse, data.message);
          break;
      }
    }

    // setLoading(false);

    // return res;
  };

  useEffect(() => {
    getList();
  }, []);

  const renderGridItem = (itemData) => {
    return (
      <ProductGridTile
        id={itemData.item.id}
        title={itemData.item.name}
        description={itemData.item.description}
        price={itemData.item.price}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'Products',
            params: {
              productId: itemData.item.id,
              productName: itemData.item.name,
              productPrice: itemData.item.price,
              productDescription: itemData.item.description,
              productImageURL: itemData.item.imageurl,
            },
          });
        }}
      />
    );
  };

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
            <Text>{direction}</Text>
            <Text>{budget}</Text>
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
            <FlatList
              data={data[0]}
              keyExtractor={(item) => item.id}
              renderItem={renderGridItem}
            />
          </View>
        </FormCard>
      </View>
    </View>
  );
};

Establishments.navigationOptions = (navigationData) => {
  const headerName = navigationData.navigation.getParam('establishmentName');

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

export default Establishments;
