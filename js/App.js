import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { reactI18nextModule } from 'react-i18next';
import { i18n, DokaApp, Navigator, settings } from '@dormakaba/digital-reactnative-client';

import Router from './Router';

// init i18n and inject hardcoded translations
import resources from './locales';

i18n.use(reactI18nextModule).init({
  fallbackLng: 'en',
  whitelist: ['en', 'de'],
  load: 'languageOnly',
  resources,
  ns: ['app'],
  defaultNS: 'app',
});

// debug XHR
if (__DEV__ && global.btoa /* is chrome dev open */) {
  // log logger
  global._fetch = fetch;
  global.fetch = function(uri, options, ...args) {
    return global._fetch(uri, options, ...args).then(response => {
      console.groupCollapsed(`Fetch ${uri.replace(settings.apiURL, '')}`);
      console.log({ request: { uri, options, ...args } });
      console.log({ response });
      console.groupEnd();
      return response;
    });
  };

  // ignore some yellowbox warnings to not get disturbed
  YellowBox.ignoreWarnings([
    // 'Warning: isMounted(...) is deprecated',
    // 'Module RCTImageLoader',
    // 'Module NfcManager',
    // 'Module RNLegicMobileSdk',
  ]);

  // CAN'T USE THIS WITH AWS AMPLIFY

  // pipe to dev
  // const _XHR = GLOBAL.originalXMLHttpRequest ?
  //     GLOBAL.originalXMLHttpRequest :
  //     GLOBAL.XMLHttpRequest
  //
  // XMLHttpRequest = _XHR
}

export default class App extends Component {
  render() {
    return (
      <DokaApp>
        <Router
          ref={navigatorRef => {
            Navigator.setContainer(navigatorRef);
          }}
        />
      </DokaApp>
    );
  }
}
