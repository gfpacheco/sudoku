import classNames from 'classnames';

import { CellState } from '../hooks/useGameState';
import shouldResetSelection from '../lib/shouldResetSelection';

export interface CellProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  cellState: CellState;
  onCellSelect: (reset: boolean) => void;
}

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
        'flex items-center justify-center w-8 sm:w-12 h-8 sm:h-12 sm:text-2xl bg-white',
        cellState.selected && 'bg-yellow-200',
      )}
      onMouseDown={handleMouseEvent}
      onMouseEnter={handleMouseEnterEvent}
      {...rest}
    >
      {cellState.value || ''}
    </div>
  );
}
