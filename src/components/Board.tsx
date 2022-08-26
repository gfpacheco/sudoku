import classNames from 'classnames';

import useDocumentListener from '../hooks/useDocumentListener';
import { ComputedCellState } from '../hooks/useGameState';
import { Settings } from '../hooks/useSettings';
import shouldResetSelection from '../lib/shouldResetSelection';
import stopPropagation from '../lib/stopPropagation';
import Cell from './Cell';

export interface BoardProps extends React.ComponentPropsWithoutRef<'div'> {
  boxes: ComputedCellState[][];
  onCellSelect: (
    boxAndCell: { boxIndex: number; cellIndex: number },
    reset: boolean,
  ) => void;
  resetSelection: () => void;
  settings: Settings;
}

export default function Board({
  className,
  boxes,
  onCellSelect,
  resetSelection,
  settings,
  ...rest
}: BoardProps) {
  useDocumentListener('mousedown', event => {
    if (shouldResetSelection(event as MouseEvent)) {
      resetSelection();
    }
  });

  return (
    <div
      className={classNames(
        className,
        'grid grid-cols-3 gap-[2px] bg-slate-500 border-2 border-slate-500',
      )}
      onMouseDown={stopPropagation}
      {...rest}
    >
      {boxes.map((box, boxIndex) => (
        <div key={boxIndex} className="grid grid-cols-3 gap-px select-none">
          {box.map((cellState, cellIndex) => (
            <Cell
              key={cellIndex}
              cellState={cellState}
              onCellSelect={reset =>
                onCellSelect({ boxIndex, cellIndex }, reset)
              }
              settings={settings}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
