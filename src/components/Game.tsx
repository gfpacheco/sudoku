import { allAnnotationTypes } from '../hooks/useAnnotation';
import useGameState from '../hooks/useGameState';
import stopPropagation from '../lib/stopPropagation';
import Board from './Board';
import Button from './Button';

export interface GameProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Game({ className, ...rest }: GameProps) {
  const {
    boxes,
    onCellSelect,
    resetSelection,
    currentAnnotationType,
    setCurrentAnnotationType,
  } = useGameState();

  return (
    <div className={className}>
      <Board
        boxes={boxes}
        onCellSelect={onCellSelect}
        resetSelection={resetSelection}
        {...rest}
      />
      <div className="mt-2 px-1 grid grid-cols-3 gap-2">
        {allAnnotationTypes.map(annotationType => (
          <Button
            key={annotationType}
            className="capitalize"
            onClick={() => setCurrentAnnotationType(annotationType)}
            onMouseDown={stopPropagation}
            secondary={annotationType !== currentAnnotationType}
          >
            {annotationType}
          </Button>
        ))}
      </div>
    </div>
  );
}
