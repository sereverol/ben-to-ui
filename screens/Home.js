import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MainButton from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderButton from '../components/HeaderButton';
import EstablishmentGridTile from '../components/EstablishmentGridTile';
import Http from '../services/Http';

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lotData, setLotData] = useState();

  let res = [];

  const getList = async () => {
    // setLoading(true);
    // const id = route.params.id;
    const data = await Http.send('GET', `/api/establishment/`);

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
      <EstablishmentGridTile
        id={itemData.item.id}
        title={itemData.item.name}
        price={itemData.item.budget}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'Establishments',
            params: {
              establishmentId: itemData.item.id,
              establishmentName: itemData.item.name,
              establishmentBudget: itemData.item.budget,
              establishmentDirection: itemData.item.direction,
              establishmentDescription: itemData.item.description,
              establishmentImageURL: itemData.item.imageurl,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <View>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          Establishments Available!
        </Text>
      </View>
      <FlatList
        data={data[0]}
        keyExtractor={(item) => JSON.stringify(item.id)}
        renderItem={renderGridItem}
        numColumns={2}
      />
    </View>
  );
};

Home.navigationOptions = (navData) => {
  return {
    headerTitle: 'Home',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="exit"
          iconName="exit"
          onPress={() => {
            navData.navigation.replace('Login');
          }}
        />
      </HeaderButtons>
    ),
    // headerShown: false,
  };
};

export default Home;
