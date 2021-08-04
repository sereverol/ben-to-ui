import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainButton from '../components/MainButton';
import FormCard from '../components/FormCard';

const Cart = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ alignItems: 'center' }}>
        <FormCard style={{ height: 500 }}>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
              padding: 5,
            }}
          >
            <Text
              style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
            >
              Your Cart!
            </Text>
          </View>

          <Text style={{ marginTop: 15, fontSize: 15, fontWeight: '600' }}>
            Added Items:
          </Text>

          <View>
            <View style={{ marginTop: 330 }}>
              <MainButton>Pagar</MainButton>
            </View>
          </View>
        </FormCard>
      </View>
    </View>
  );
};

export default Cart;
