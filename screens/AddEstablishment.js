import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import FormCard from '../components/FormCard';

import Http from '../services/Http';
import Field from '../util/Field';
import MainButton from '../components/MainButton';

const AddEstablishment = (props) => {
  const [establishment, setEstablishment] = useState({
    name: '',
    direction: '',
    description: '',
    budget: '',
    imageurl: '',
  });

  const createEstablishment = async () => {
    if (
      !Field.checkFields([
        establishment.name,
        establishment.direction,
        establishment.description,
        establishment.budget,
      ])
    ) {
      Alert.alert('Empty Field', 'Please, fill the fields');
    } else {
      const data = await Http.send('POST', '/api/establishment', establishment);

      if (!data) {
        Alert.alert('Fatal Error', 'No data from server...');
      } else {
        switch (data.typeResponse) {
          case 'Success':
            // await AsyncStorage.setItem('user', JSON.stringify(data.body[0]));
            console.log(data.body.id.establishment_name);
            const establishment_id = data.body.id.establishment_id;
            const establishmentName = data.body.id.establishment_name;
            const imageurl = data.body.id.establishment_imageurl;
            if (establishment_id >= 1) {
              props.navigation.navigate('AddProducts', {
                es_id: establishment_id,
                es_name: establishmentName,
                es_image: imageurl,
              });
              // } else if (data.body[0].admin === null) {
              //   props.navigation.replace('Home');
            }
            // navigation.navigate('Home', data.body[0]);
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
            marginVertical: 150,
          }}
        >
          <FormCard style={{ height: 420 }}>
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
              New Establishment
            </Text>

            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                onChangeText={(name) =>
                  setEstablishment({ ...establishment, name: name })
                }
                placeholder="Name"
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                onChangeText={(description) =>
                  setEstablishment({
                    ...establishment,
                    description: description,
                  })
                }
                placeholder="Description"
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                onChangeText={(budget) =>
                  setEstablishment({ ...establishment, budget: budget })
                }
                placeholder="Expected Budget"
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                onChangeText={(direction) =>
                  setEstablishment({ ...establishment, direction: direction })
                }
                placeholder="Direction"
              />
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.inputText}
                onChangeText={(imageurl) =>
                  setEstablishment({ ...establishment, imageurl: imageurl })
                }
                placeholder="Image from the Web"
                multiline={true}
              />
            </View>
            <MainButton onPress={() => createEstablishment()}>
              Save Estableshiment
            </MainButton>
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
});

export default AddEstablishment;
