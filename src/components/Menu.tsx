import classNames from 'classnames';

import { Settings } from '../hooks/useSettings';
import MenuDot from './MenuDot';
import MenuItem from './MenuItem';
import MenuSetting from './MenuSetting';

export interface MenuProps extends React.ComponentPropsWithoutRef<'div'> {
  settings: Settings;
  setSetting: (key: keyof Settings, value: boolean) => void;
  restartGame: () => void;
  newGame: () => void;
  clearAnnotations: () => void;
  autoAnnotate: () => void;
}

export default function Menu({
  className,
  settings,
  setSetting,
  restartGame,
  newGame,
  clearAnnotations,
  autoAnnotate,
  ...rest
}: MenuProps) {
  return (
    <div
      className={classNames(
        className,
        'relative group p-3 grid grid-flow-col gap-1',
      )}
      {...rest}
    >
      <MenuDot />
      <MenuDot />
      <MenuDot />
      <div className="absolute top-4 right-0 w-56 hidden group-hover:flex border flex-col rounded bg-white py-2 z-10">
        {Object.keys(settings).map(setting => (
          <MenuSetting
            key={setting}
            settings={settings}
            setting={setting as keyof Settings}
            setSetting={setSetting}
          />
        ))}
        <MenuItem onClick={clearAnnotations}>Clear annotations</MenuItem>
        <MenuItem onClick={autoAnnotate}>Auto annotate</MenuItem>
        <MenuItem onClick={restartGame}>Restart</MenuItem>
        <MenuItem onClick={newGame}>New Game</MenuItem>
      </div>
    </div>
  );
}
