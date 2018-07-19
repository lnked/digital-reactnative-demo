import { compose } from './misc';

export const removeLeadingZeroes = str => str.replace(/^0+/, '');

export const removeWhitespace = str => str.replace(/\W/g, '');

export const toUpperCase = str => str.toUpperCase();

export const formatCidForBackend = compose(
  removeLeadingZeroes,
  removeWhitespace,
  toUpperCase
);

export const padLeft = (str, length, char) =>
  str.length < length ? padLeft(`${char}${str}`, length, char) : str;

export const formatCid = cid =>
  padLeft(cid, 16, '0')
    .replace(/\S{4}/g, '$& ')
    .trim();
