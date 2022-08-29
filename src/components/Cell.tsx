import classNames from 'classnames';

import { ComputedCellState } from '../hooks/useGameState';
import { Settings } from '../hooks/useSettings';
import shouldResetSelection from '../lib/shouldResetSelection';

export interface CellProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  cellState: ComputedCellState;
  onCellSelect: (reset: boolean) => void;
  settings: Settings;
}

const cornerAnnotationClasses = {
  1: [''],
  2: ['', 'col-start-3'],
  3: ['', 'col-start-3', 'row-start-3'],
  4: ['', 'col-start-3', 'row-start-3', 'col-start-3 row-start-3'],
  5: ['', '', '', 'row-start-3', 'col-start-3 row-start-3'],
  6: [
    '',
    '',
    '',
    'row-start-3',
    'col-start-2 row-start-3',
    'col-start-3 row-start-3',
  ],
  7: [
    '',
    '',
    '',
    '',
    'row-start-3',
    'col-start-2 row-start-3',
    'col-start-3 row-start-3',
  ],
  8: [
    '',
    '',
    '',
    '',
    'col-start-3',
    'row-start-3',
    'col-start-2 row-start-3',
    'col-start-3 row-start-3',
  ],
  9: ['', '', '', '', '', '', '', '', ''],
} as { [key: number]: string[] };

export default function Cell({
  className,
  cellState,
  onCellSelect,
  settings,
  ...rest
}: CellProps) {
  function handleMouseEvent(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    onCellSelect(shouldResetSelection(event));
  }

  function handleMouseEnterEvent(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (event.buttons === 1) {
      onCellSelect(false);
    }
  }

  return (
    <div
      className={classNames(
        className,
        'relative flex items-center justify-center w-8 sm:w-12 h-8 sm:h-12',
        settings.highlight && cellState.highlighted
          ? 'text-2xl sm:text-3xl'
          : 'sm:text-2xl',
        settings.error && cellState.error
          ? 'text-red-500'
          : !cellState.fixed && 'text-blue-500',
        cellState.selected
          ? 'bg-yellow-200'
          : settings.highlight && cellState.highlighted
          ? 'bg-blue-50'
          : settings.forbidden && cellState.forbidden
          ? 'bg-red-50'
          : 'bg-white',
      )}
      onMouseDown={handleMouseEvent}
      onMouseEnter={handleMouseEnterEvent}
      {...rest}
    >
      {cellState.value || ''}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 content-center text-xs text-center text-slate-400 font-light">
        {cellState.annotations.corner.sort().map((value, index) => (
          <div
            key={value}
            className={
              cornerAnnotationClasses[cellState.annotations.corner.length][
                index
              ]
            }
          >
            {value}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-sm text-center text-slate-400 font-light">
        {cellState.annotations.center.sort().join(' ')}
      </div>
    </div>
  );
}
