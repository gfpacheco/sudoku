import merge from 'lodash.merge';
import { useEffect, useState } from 'react';

export default function usePersistentState<T>(
  defaultValueOrFunction: T | (() => T),
  key: string,
  mergeFunction: (defaultValue: T, persistedValue: T) => T = merge,
) {
  const [state, setState] = useState(() => {
    const json = localStorage.getItem(key);
    const defaultValue =
      defaultValueOrFunction instanceof Function
        ? defaultValueOrFunction()
        : defaultValueOrFunction;

    if (json) {
      const loadedValue = JSON.parse(json) as T;
      return typeof loadedValue === 'object'
        ? mergeFunction(defaultValue, loadedValue)
        : loadedValue;
    }

    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
