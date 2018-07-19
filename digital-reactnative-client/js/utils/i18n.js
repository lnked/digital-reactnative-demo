import i18next from 'i18next';
import DeviceInfo from 'react-native-device-info';

const languageDetector = {
  type: 'languageDetector',
  detect: () => DeviceInfo.getDeviceLocale(),
  init: () => {},
  cacheUserLanguage: () => {},
};

const defaults = {
  debug: __DEV__,

  interpolation: {
    escapeValue: false, // not needed for react!!
    // format
  },
};

i18next.use(languageDetector);

const orginalInit = i18next.init;
i18next.init = (opts, cb) => {
  orginalInit.call(i18next, { ...defaults, ...opts }, cb);
};

export const i18n = i18next;
