import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native';


import { Icon,Card } from 'react-native-elements';

import Http from '../components/Http';
import Field from '../components/Fields';
import MainButton from '../components/MainButton';




const AdminHome = ({ navigation, route }) => {

 
  const [vissiblePassFlag] = useState(false);

  const  gotoAdmin =()=>{
    console.log('go to Admin')
  }
  const deleteAdmin = ()=>{
    console.log ('delete admin')
  }
  const Header = ({ title, action, action1 }) => (
    <View style={styles.Header}  >
        <Icon
            name='close-outline'
            color='gray'
            type='ionicon'
            size={30}
            checked={vissiblePassFlag}
            onPress={action}
        />
        

        <Text style={{ fontSize: 30 }}>
            {title}
        </Text>
        <MainButton style={styles.saveButton}
            title="Save"
            type="outline"
            size={30}
            checked={vissiblePassFlag}
            onPress={action1}
        />

    </View>

)
  return (
  
    <ScrollView>
      <View>
          <Card>
          <Text>Information Product</Text>
          <Card.Divider/>
          <TextInput style={styles.inputText}
          placeholder="Name Product"
          />
          
         <TextInput style={styles.inputText}
          placeholder="Price Product"
          />
          <MainButton>Save Product</MainButton>
        </Card>
      </View>
      <View>
           <Card >
          <Text>Information Estableshiment</Text>
          <Card.Divider/>
          <TextInput style={styles.inputText}
          placeholder="Name Estableshiment"
          />

           <TextInput style={styles.inputText}
          placeholder="Direction Estableshiment"
          />
          <MainButton>Save Estableshiment</MainButton>
         
        </Card>
      </View>
    </ScrollView>
  );
};
export default AdminHome;
const styles = StyleSheet.create({
  MainContainer: {
      flex: 1,
      margin: 10

  },
  Header: {

      marginTop: 24,
      backgroundColor: 'white',
      padding: '2%',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: "center",
      paddingHorizontal: 10,
      flexDirection: 'row',

  },

  inputText: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      color: 'gray'
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
      backgroundColor: '#f4f6fc'
  },


});
