import { View } from 'react-native';
import { Text } from '@dormakaba/digital-reactnative-visual';
import React, { Component } from 'react';
import { Snack } from '../digital-reactnative-client';

export default class UsingSnack extends Component {
  componentDidMount() {
    // Show a global
    setTimeout(() => {
      Snack.show({
        message: 'Hello',
      });
    }, 1000);

    setTimeout(() => {
      Snack.show({
        message: 'Sorry an error not an info',
        type: 'error',
      });
    }, 2000);

    // Show a local
    setTimeout(() => {
      Snack.show({
        id: 'rememberME',
        restricted: 'someForm',
        message: 'Hello again',
        type: 'warning',
      });
    }, 3000);

    setTimeout(() => {
      Snack.hide('rememberME');
    }, 12000);
  }

  render() {
    return (
      <View>
        <Snack.Global />
        <View style={{ marginTop: 80 }}>
          <Snack.Local restricted="someForm" />
        </View>
      </View>
    );
  }
}
