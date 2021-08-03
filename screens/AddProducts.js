import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';

import FormCard from '../components/FormCard';
import Http from '../components/Http';
import Field from '../components/Fields';

import MainButton from '../components/MainButton';

const AddProducts = (props) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: null,
    imageurl: '',
    establishmentId: '',
  });

  useEffect(() => {
    setProduct({ ...product, establishmentId: esId });
    return () => {
      console.log(product);
    };
  }, []);

  const esName = props.navigation.getParam('es_name');
  const esId = props.navigation.getParam('es_id');
  const imageurl = props.navigation.getParam('es_image');

  const createProduct = async () => {
    if (
      !Field.checkFields([product.name, product.description, product.price])
    ) {
      Alert.alert('Empty Field', 'Please, fill the fields');
    } else {
      const data = await Http.send('POST', '/api/product', product);

      if (!data) {
        Alert.alert('Fatal Error', 'No data from server...');
      } else {
        switch (data.typeResponse) {
          case 'Success':
            // await AsyncStorage.setItem('user', JSON.stringify(data.body[0]));
            Alert.alert('Product Created', 'Yay!');
            if (data) {
              //   props.navigation.navigate('AddProducts', {
              //     es_id: establishment_id,
              //     es_name: establishmentName,
              // });
              console.log(data);
            } else if (data.body[0].admin === null) {
              props.navigation.replace('Home');
            }
            navigation.navigate('Home', data.body[0]);
            break;

          case 'Fail':
            data.body.errors.forEach((element) => {
              console.log(element.text);
            });
            break;

          default:
            Alert.alert(data.typeResponse, data.message);
            break;
        }
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.mainContainer}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Create Products For: {esName}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: imageurl,
              }}
              resizeMode="cover"
            />
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 3,
          }}
        >
          <FormCard style={{ height: 360 }}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                shadowColor: 'black',
                shadowRadius: 6,
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              Add Product
            </Text>

            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                onChangeText={(name) => setProduct({ ...product, name: name })}
                placeholder="Name"
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                onChangeText={(description) =>
                  setProduct({ ...product, description: description })
                }
                placeholder="Description"
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                keyboardType="numeric"
                onChangeText={(price) =>
                  setProduct({ ...product, price: price })
                }
                placeholder="Price"
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                onChangeText={(imageurl) =>
                  setProduct({ ...product, imageurl: imageurl })
                }
                placeholder="Image from the Web"
              />
            </View>
            <MainButton onPress={() => createProduct()}>Add Product</MainButton>
          </FormCard>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  section: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'rgba(204, 204, 204, 0.78)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },
  inputText: {
    flex: 1,
    color: 'black',
    paddingLeft: 10,
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
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 20,
  },
});

export default AddProducts;
