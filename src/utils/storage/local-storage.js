import {canUseDOM} from 'exenv';

export const storage = 'localStorage';

const get = (key, defaultValue = null) => {
  if (!canUseDOM) return defaultValue;
  if (window[storage].getItem(key) === 'undefined') return defaultValue;

  try {
    return JSON.parse(
      window[storage].getItem(key) || JSON.stringify(defaultValue),
    );
  } catch {
    return null;
  }
};

const set = (key, value) => {
  if (canUseDOM) window[storage].setItem(key, JSON.stringify(value));
};

export default {get, set};
