export { default as get } from 'lodash.get';
export { default as set } from 'lodash.set';

export function isFunction(value) {
  return typeof value === 'function';
}

export function compose() {
  const funcs = arguments;
  let length = funcs.length;

  while (length--) {
    if (!isFunction(funcs[length])) {
      throw new TypeError();
    }
  }

  return function() {
    let args = arguments;
    let length = funcs.length;

    while (length--) {
      args = [funcs[length].apply(this, args)];
    }
    return args[0];
  };
}

export function debounce(func, waitFor, immediate) {
  let timeout;
  return () => {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, waitFor);
    if (callNow) func.apply(context, args);
  };
}

export const uuid = {
  v4: function b(
    a // placeholder
  ) {
    return a // if the placeholder was passed, return
      ? // a random number from 0 to 15
        (
          a ^ // unless b is 8,
          ((Math.random() * // in which case
            16) >> // a random number from
            (a / 4))
        ) // 8 to 11
          .toString(16) // in hexadecimal
      : // or otherwise a concatenated string:
        (
          [1e7] + // 10000000 +
          -1e3 + // -1000 +
          -4e3 + // -4000 +
          -8e3 + // -80000000 +
          -1e11
        ) // -100000000000,
          .replace(
            // replacing
            /[018]/g, // zeroes, ones, and eights with
            b // random hex digits
          );
  },
};
