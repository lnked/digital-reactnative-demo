// An active version of the @dormakaba/taibika-visual Textfield component.
import React from 'react';
import { Field } from 'react-final-form';
import { Textfield as VTextfield } from '@dormakaba/digital-reactnative-visual';
import moment from 'moment';

const defaultFormatters = {
  date: date => moment(date).format('YYYY-MM-DD'),
};

const defaultParsers = {
  date: date =>
    moment(date)
      .utc()
      .format(),
};

export class Textfield extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.input.focus();
  }

  render() {
    const { type } = this.props;
    return (
      <Field
        ref={c => {
          this.input = c;
        }}
        component={renderTextfield}
        format={defaultFormatters[type]}
        parse={defaultParsers[type]}
        {...this.props}
      />
    );
  }
}

// Pass in the readonly context as props.
// Without this, redux-form will not rerender the input if the readonly state changes.
// export default readonlyAsProp(ActiveTextfield);
// eslint-disable-next-line react/no-multi-comp
class renderTextfield extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.input.focus();
  }

  render() {
    const { input, meta, ...rest } = this.props;
    const showError = meta.touched;
    return (
      <VTextfield
        ref={c => {
          this.input = c;
        }}
        error={showError ? meta.error : null}
        onChangeText={value => input.onChange(value)}
        value={input.value}
        {...rest}
      />
    );
  }
}
