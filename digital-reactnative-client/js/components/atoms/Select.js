// An active version of the @dormakaba/taibika-visual Textfield component.
import React from 'react';
import { Field } from 'react-final-form';
import { Select as VSelect } from '@dormakaba/digital-reactnative-visual';

export class Select extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.input.focus();
  }

  render() {
    return (
      <Field
        ref={c => {
          this.input = c;
        }}
        component={renderSelect}
        {...this.props}
      />
    );
  }
}

// Pass in the readonly context as props.
// Without this, redux-form will not rerender the input if the readonly state changes.
// export default readonlyAsProp(ActiveTextfield);
// eslint-disable-next-line react/no-multi-comp
class renderSelect extends React.Component {
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
      <VSelect
        ref={c => {
          this.input = c;
        }}
        error={showError ? meta.error : null}
        onChange={value => input.onChange(value.key)}
        value={input.value}
        {...rest}
      />
    );
  }
}
