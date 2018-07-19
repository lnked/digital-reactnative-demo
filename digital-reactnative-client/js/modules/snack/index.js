import React, { Component } from 'react';
import { View } from 'react-native';
import { Snack as VSnack, Notification } from '@dormakaba/digital-reactnative-visual';
import EventEmitter from '../../utils/EventEmitter.js';
import { uuid } from '../../utils/misc';

class SnackController extends EventEmitter {
  constructor() {
    super();

    this.data = {};
  }

  show(notification) {
    const {
      id = uuid.v4(),
      message,
      restricted = 'global',
      type = 'info',
      dismiss = !notification.restricted ? 5000 : false,
      ...rest
    } = notification;

    const newNotification = {
      id,
      message,
      restricted,
      type,
      dismiss,
      ...rest,
    };

    this.data[id] = newNotification;
    this.emit(`show_${restricted}`, newNotification);

    if (dismiss) {
      setTimeout(() => {
        this.hide(id);
      }, dismiss);
    }
  }

  hide(id) {
    const noti = this.data[id];
    if (noti) {
      this.emit(`hide_${noti.restricted}`, noti);
      delete this.data[id];
    }
  }
}

export const Snack = new SnackController();

class GlobalSnack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    Snack.on('show_global', this.show);
    Snack.on('hide_global', this.hide);
  }

  componentWillUnmount() {
    Snack.off('show_global', this.show);
    Snack.off('hide_global', this.hide);
  }

  show(noti) {
    this.setState({ current: noti }, () => {
      this.snack.show();
    });
  }

  hide(noti) {
    const { current } = this.state;
    if (current.id === noti.id) {
      this.snack.hide();
    }
  }

  render() {
    const { style } = this.props;
    const { current } = this.state;

    const addProps = {};
    if (current) addProps[current.type] = true;

    return (
      <View style={[{ position: 'absolute', left: 0, right: 0, top: 0 }, style]}>
        {current && (
          <VSnack
            ref={c => {
              this.snack = c;
            }}
            message={current.message}
            {...addProps}
          />
        )}
      </View>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class RestrictedSnack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    const { restricted } = this.props;
    Snack.on(`show_${restricted}`, this.show);
    Snack.on(`hide_${restricted}`, this.hide);
  }

  componentWillUnmount() {
    Snack.off(`show_${restricted}`, this.show);
    Snack.off(`hide_${restricted}`, this.hide);
  }

  show(noti) {
    this.setState({ current: noti });
  }

  hide(noti) {
    const { current } = this.state;
    if (current.id === noti.id) {
      this.setState({ current: null });
    }
  }

  render() {
    const { current } = this.state;

    if (!current) return null;

    const addProps = {};
    if (current) addProps[current.type] = true;

    return (
      <Notification icon={current.icon} key={current.id} {...addProps}>
        {current.message}
      </Notification>
    );
  }
}

Snack.Global = GlobalSnack;
Snack.Local = RestrictedSnack;
