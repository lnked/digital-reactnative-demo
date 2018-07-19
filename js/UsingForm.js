import { View } from 'react-native';
import { Button } from '@dormakaba/digital-reactnative-visual';
import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { form, validate, Textfield } from '../digital-reactnative-client';

export class UsingForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    const callback = (...args) => {
      console.warn(...args);
    };

    return (
      <View>
        <Textfield label="bio" name="bio" />

        <Button primary onPress={handleSubmit}>
          send
        </Button>
      </View>
    );
  }
}

export default form({
  validate: validate({
    bio: 'required',
  }),
  onSubmit: values => {
    console.warn(values);
  },
})(UsingForm);
