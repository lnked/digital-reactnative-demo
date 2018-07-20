import { View } from 'react-native';
import { Text } from '@dormakaba/digital-reactnative-visual';
import React, { Component } from 'react';
import { DokaApp, AppState, i18n } from '@dormakaba/digital-reactnative-client';

i18n.init({
  fallbackLng: 'en',

  whitelist: ['en', 'de'],
  load: 'languageOnly',
  resources: {
    en: {
      visual: { someKey: 'translated value' },
    },
  },
});

export default class UsingDokaApp extends Component {
  render() {
    return (
      <DokaApp>
        <AppState>
          {({ t, offline, deviceInfo }) => (
            <View>
              <Text>{t('someKey')}</Text>
              <Text>{`is offline: ${offline}`}</Text>
              <Text>{JSON.stringify(deviceInfo)}</Text>
            </View>
          )}
        </AppState>
      </DokaApp>
    );
  }
}
