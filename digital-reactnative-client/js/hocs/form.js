import React from 'react';
import { Form } from 'react-final-form';

export function form(options) {
  return function formWrapper(Component) {
    class FormComponent extends React.Component {
      constructor(props) {
        super(props);

        this.defaultOnCancel = this.defaultOnCancel.bind(this);
      }

      defaultOnCancel() {
        this.form.reset();
      }

      render() {
        const { handleCancel = this.defaultOnCancel, ...rest } = this.props;

        return (
          <Form
            ref={c => {
              this.form = c;
            }}
            {...options}
            {...rest}
            render={({ handleSubmit, prestine, ...rest2 }) => (
              <Component
                {...rest}
                {...rest2}
                prestine={prestine}
                handleCancel={handleCancel}
                disableSubmit={prestine}
                handleSubmit={handleSubmit}
              />
            )}
          />
        );
      }
    }

    return FormComponent;
  };
}
