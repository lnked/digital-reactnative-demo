import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info';
import { VisualContext } from '@dormakaba/digital-reactnative-visual';
import { View, NetInfo } from 'react-native';
import { i18n } from './utils/i18n';

export class DokaApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceInfo: null,
      offline: false,
      t: k => k,
    };

    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then(this.handleConnectivityChange);
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);

    this.setState({
      t: i18n.getFixedT(null, 'visual'),
    });
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange(connectionInfo) {
    this.setState({
      offline: !connectionInfo.type,
    });
  }

  handleLayoutChange(e) {
    const { width, height } = e.nativeEvent.layout;
    this.setState({
      deviceInfo: {
        isTablet: DeviceInfo.isTablet(),
        width,
        height,
        isPortrait: width <= height,
        isLandscape: width > height,
      },
    });
  }

  render() {
    const { children } = this.props;
    const { deviceInfo, offline, t } = this.state;

    return (
      <View onLayout={this.handleLayoutChange} style={{ flex: 1 }}>
        <VisualContext.Provider value={{ t, offline, deviceInfo }}>
          {children}
        </VisualContext.Provider>
      </View>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export class AppState extends Component {
  render() {
    const { children } = this.props;

    return <VisualContext.Consumer>{ctx => children(ctx)}</VisualContext.Consumer>;
  }
}
