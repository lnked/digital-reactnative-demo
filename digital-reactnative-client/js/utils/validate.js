import Validator from 'validatorjs';
import moment from 'moment';
import { unflatten } from 'flat';

// try to fix validatorjs
// https://github.com/skaterdav85/validatorjs/issues/65
import Lang from 'validatorjs/src/lang';
import { i18n } from './i18n';

Lang._load = function(lang) {
  if (!Lang.messages[lang]) {
    const rawMessages = require('validatorjs/src/lang/en'); // eslint-disable-line global-require
    Lang._set(lang, rawMessages);
  }
};

// Check if value is includes in usedValuesString.
// Comparison is performed after passing values through 'normalizer'.
function checkUniqueness(value, usedValuesString, normalizer) {
  const normalizedUsedValues = usedValuesString.split(',').map(normalizer);
  const normalizedValue = normalizer(value);
  return !normalizedUsedValues.includes(normalizedValue);
}

Validator.register('phone_number', str => /^(\+?( |\d|\-|\/|\(|\))+)?$/.test(str));

Validator.register('in_future', date => moment(date).isAfter(moment()));

Validator.register('in_past', date => moment(date).isBefore(moment()));

Validator.register('unique_from', (value, usedValuesString) =>
  checkUniqueness(value, usedValuesString, x => x.trim())
);

// Validator.register(
//   'cid_unique_from',
//   (cid, usedCidsString) => checkUniqueness(cid, usedCidsString, formatCidForBackend)
// );

Validator.register('only_digits', str => /^\d*$/.test(str));

Validator.register('hex', str => /^[0-9a-fA-F]*$/.test(str));

// eslint-disable-next-line import/prefer-default-export
export function validate(rules) {
  return values => {
    let commonMessages = i18n.t('validation:messages', { returnObjects: true });
    if (typeof commonMessages === 'string') commonMessages = {};
    const validator = new Validator(values || {}, rules, commonMessages);
    validator.passes();
    const errors = {};
    Object.keys(validator.errors.all()).forEach(field => {
      errors[field] = validator.errors.first(field);
    });
    return unflatten(errors);
  };
}
