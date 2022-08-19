import { allAnnotationTypes } from '../hooks/useAnnotation';
import useGameState from '../hooks/useGameState';
import stopPropagation from '../lib/stopPropagation';
import { Difficulty } from './App';
import Board from './Board';
import Button from './Button';

export interface GameProps extends React.ComponentPropsWithoutRef<'div'> {
  difficulty: Difficulty;
}

export default function Game({ className, difficulty, ...rest }: GameProps) {
  const {
    loading,
    error,
    boxes,
    onCellSelect,
    resetSelection,
    currentAnnotationType,
    setCurrentAnnotationType,
  } = useGameState(difficulty);

  if (loading) {
    return <div {...rest}>Loading...</div>;
  }

  if (error) {
    return <div {...rest}>Error: {error}</div>;
  }

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
