import update from 'immutability-helper';
import { useState } from 'react';

export interface Settings {
  error: boolean;
  highlight: boolean;
  forbidden: boolean;
}

const defaultSettings = {
  error: true,
  highlight: true,
  forbidden: true,
};

export type UseSettingsReturn = ReturnType<typeof useSettings>;

export default function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  function setSetting(key: keyof Settings, value: boolean) {
    setSettings(prev =>
      update(prev, {
        [key]: { $set: value },
      }),
    );
  }

  return {
    settings,
    setSetting,
  };
}
