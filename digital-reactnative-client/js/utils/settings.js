import { get, set } from './misc';

export const settings = {
  data: {},

  get(key, defaultValue) {
    return get(this.data, key, defaultValue);
  },

  set(key, value) {
    set(this.data, key, value);
  },
};
