import { View } from 'react-native';
import { Button } from '@dormakaba/digital-reactnative-visual';
import React, { Component } from 'react';
import { form, validate, Textfield } from '@dormakaba/digital-reactnative-client';

export class UsingForm extends Component {
  render() {
    const { handleSubmit } = this.props;

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
