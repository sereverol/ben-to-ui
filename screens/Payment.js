import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { PaymentView } from '../components/PaymentView';
import Http from '../services/Http';
import MainButton from '../components/MainButton';

const PaymentScreen = () => {
  const [response, setResponse] = useState();

  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const cartInfo = {
    id: '5eruyt35eggr76476236523t3',
    description: 'T Shirt -Logo Batman',
    amount: 1,
  };

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus('Please wait while confirming your payment!');
    setResponse(paymentResponse);

    let jsonResponse = JSON.parse(paymentResponse);

    try {
      const stripeResponse = await Http.post('POST', '/api/payment', payment, {
        email: 'Juansoco3@gmail.com',
        product: cartInfo,
        authToken: jsonResponse,
      });

      if (stripeResponse) {
        const { paid } = stripeResponse.data;
        if (paid === true) {
          setPaymentStatus('Payment Success');
        } else {
          setPaymentStatus('Payment failed due to some issue');
        }
      } else {
        setPaymentStatus(' Payment failed due to some issue');
      }
    } catch (error) {
      console.log(error);
      setPaymentStatus(' Payment failed due to some issue');
    }
  };

  const paymentUI = () => {
    if (!makePayment) {
      return (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 25, margin: 10 }}> Make Payment </Text>
          <Text
            style={{
              fontSize: 16,
              margin: 10,
              padding: 1,
              textAlign: 'center',
            }}
          >
            {' '}
            You'll get a recepit after completing the payment process
          </Text>
          <Text style={{ fontSize: 16, margin: 10 }}>
            {' '}
            Payable Amount: ${cartInfo.amount}{' '}
          </Text>

          <MainButton onPress={() => setMakePayment(true)}>
            Proceed To Payout
          </MainButton>
        </View>
      );
    } else {
      if (response !== undefined) {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 25, margin: 10 }}> {paymentStatus} </Text>
            <Text style={{ fontSize: 16, margin: 10 }}> {response} </Text>
          </View>
        );
      } else {
        return (
          <PaymentView
            onCheckStatus={onCheckStatus}
            product={cartInfo.description}
            amount={cartInfo.amount}
          />
        );
      }
    }
  };

  return <View style={styles.container}>{paymentUI()}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 100 },
  navigation: { flex: 2, backgroundColor: 'red' },
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  footer: { flex: 1, backgroundColor: 'cyan' },
});

export { PaymentScreen };
