import classNames from 'classnames';

import { CellState } from '../hooks/useGameState';
import shouldResetSelection from '../lib/shouldResetSelection';

export interface CellProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  cellState: CellState;
  onCellSelect: (reset: boolean) => void;
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
        'relative flex items-center justify-center w-8 sm:w-12 h-8 sm:h-12 sm:text-2xl bg-white',
        !cellState.fixed && 'text-blue-500',
        cellState.selected && 'bg-yellow-200',
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
      <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400 font-light">
        {cellState.annotations.center.sort().join(' ')}
      </div>
    </div>
  );
}
