import {useRef, useEffect, useState} from 'react';

import {canUseDOM} from 'exenv';
import {localStorage as storage} from '../storage';

export default function useStoredState(key, defaultValue) {
  const checked = useRef(false);
  const [value, setValue] = useState(() => storage.get(key, defaultValue));

  useEffect(() => {
    if (!canUseDOM || checked.current) return;

    const stickyValue = storage.get(key, undefined);
    if (stickyValue !== undefined) {
      setValue(stickyValue);
      checked.current = true;
    }
  }, [setValue, key]);

  useEffect(() => {
    if (canUseDOM) {
      if (value === undefined) window.localStorage.removeItem(key);
      else storage.set(key, value);
    }
  }, [value, key]);

  return [value, setValue];
}
