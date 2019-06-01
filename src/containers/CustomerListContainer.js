import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';

export default class CustomerListContainer extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text>TODO CUSTOMER LIST</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: colors.white,
  },
});
