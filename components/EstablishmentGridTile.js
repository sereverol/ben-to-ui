import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const EstablishmentGridTile = (props) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
      <View style={{ ...styles.container, ...{ backgroundColor: 'white' } }}>
        <View
          style={{
            marginTop: 15,

            justifyContent: 'flex-start',
            alignItems: 'stretch',
          }}
        >
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.title}>Price Range: {props.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
  },
  title: {
    fontSize: 15,
    padding: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default EstablishmentGridTile;
