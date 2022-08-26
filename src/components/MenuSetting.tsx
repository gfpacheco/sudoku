import classNames from 'classnames';
import { MouseEvent } from 'react';

import { Settings } from '../hooks/useSettings';

export interface MenuSettingProps
  extends React.ComponentPropsWithoutRef<'button'> {
  settings: Settings;
  setting: keyof Settings;
  setSetting: (key: keyof Settings, value: boolean) => void;
}

export default function MenuSetting({
  className,
  settings,
  setting,
  setSetting,
  onClick,
  ...rest
}: MenuSettingProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setSetting(setting, !settings[setting]);
    onClick?.(event);
  }
  return (
    <button
      className={classNames(
        className,
        'px-4 py-2 hover:bg-slate-50 cursor-pointer flex justify-between items-center capitalize',
      )}
      type="button"
      onClick={handleClick}
      {...rest}
    >
      {setting}
      <span
        className={classNames(
          'bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
          settings[setting] ? 'bg-green-500' : 'bg-gray-200',
        )}
      >
        <span
          className={classNames(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
            settings[setting] ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </span>
    </button>
  );
}
