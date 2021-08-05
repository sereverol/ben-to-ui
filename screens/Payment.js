<<<<<<< HEAD
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
=======
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { Secret_key, STRIPE_PUBLISHABLE_KEY } from '../util/key';


const CURRENCY = 'USD';
var CARD_TOKEN = null;


function getCreditCardToken(creditCardData){
  
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {

      Accept: 'application/json',
     
      'Content-Type': 'application/x-www-form-urlencoded',
     
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },

    method: 'post',
   
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
  then(response => response.json())
  .catch((error)=>console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
 function subscribeUser(creditCardToken){
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

const StripeGateway = () => {


  const [CardInput, setCardInput] = React.useState({})

  const onSubmit = async () => {

    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert('Invalid Credit Card');
      return false;
    }

    let creditCardToken;
    try {
     
      creditCardToken = await getCreditCardToken(CardInput);
      
      if (creditCardToken.error) {
        alert("creditCardToken error");
        return;
      }
    } catch (e) {
      console.log("e",e);
      return;
    }
   
    const { error } = await subscribeUser(creditCardToken);
    
    if (error) {
      alert(error)
    } else {
     
      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if(pament_data.status == 'succeeded')
      {
        alert("Payment Successfully");
      }
      else{
        alert('Payment failed');
>>>>>>> 60d650ae71870c9ebff1739432ad09c64ee2f116
      }
    }
  };

<<<<<<< HEAD
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
=======


  const charges = async () => {

    const card = {
        'amount': 50, 
        'currency': CURRENCY,
        'source': CARD_TOKEN,
        'description': "Developers Sin Subscription"
      };

      return fetch('https://api.stripe.com/v1/charges', {
        headers: {
         
          Accept: 'application/json',
          
          'Content-Type': 'application/x-www-form-urlencoded',
          
          Authorization: `Bearer ${Secret_key}`
        },
      
        method: 'post',
         
        body: Object.keys(card)
          .map(key => key + '=' + card[key])
          .join('&')
      }).then(response => response.json());
  };
  


  const _onChange =(data) => {
    setCardInput(data)
  }

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
        <Image 
        
        source={require('../assets/ben-to.png')}
        style={styles.ImgStyle}
        />
        <CreditCardInput 
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ccc"
        onChange={_onChange} />

      <TouchableOpacity 
      onPress={onSubmit}
      style={styles.button}>
        <Text
          style={styles.buttonText}>
          Pay Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button : {
    backgroundColor:'#2471A3',
    width:150,
    height:45,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5
  },
  buttonText : {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  inputContainerStyle : {
    backgroundColor:'#fff',
    borderRadius:5
  },
  inputStyle : {
    backgroundColor:'#222242',
    paddingLeft:15,
    borderRadius:5,
    color:'#fff'
  },
  labelStyle : {
    marginBottom:5,
    fontSize:12
  }
 
});

export default StripeGateway;
>>>>>>> 60d650ae71870c9ebff1739432ad09c64ee2f116
