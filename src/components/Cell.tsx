import classNames from 'classnames';

import { CellState } from '../hooks/useGameState';

export interface CellProps extends React.ComponentPropsWithoutRef<'div'> {
  cellState: CellState;
}

export default function Cell({ className, cellState, ...rest }: CellProps) {
  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-center w-8 sm:w-12 h-8 sm:h-12 sm:text-2xl bg-white',
      )}
      {...rest}
    >
      {cellState.value || ''}
    </div>
  );
}
