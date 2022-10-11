import classNames from 'classnames';

import { allAnnotationTypes } from '../hooks/useAnnotation';
import useCelebration from '../hooks/useCelebration';
import useGameState from '../hooks/useGameState';
import stopPropagation from '../lib/stopPropagation';
import Board from './Board';
import Button from './Button';
import Keyboard from './Keyboard';
import Menu from './Menu';

export interface GameProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Game({ className, ...rest }: GameProps) {
  const {
    boxes,
    onCellSelect,
    resetSelection,
    currentAnnotationType,
    setCurrentAnnotationType,
    annotate,
    settings,
    setSetting,
    clearAnnotations,
    restartGame,
    newGame,
    complete,
    time,
    bestTime,
  } = useGameState();
  useCelebration(complete);

  return (
    <div className={classNames(className, 'flex flex-col')} {...rest}>
      <div className="flex justify-between">
        <p
          className="text-lg"
          title={
            bestTime
              ? `Best time: ${bestTime}`
              : 'Your best time will be registered'
          }
        >
          {time}
        </p>
        <Menu
          settings={settings}
          setSetting={setSetting}
          clearAnnotations={clearAnnotations}
          restartGame={restartGame}
          newGame={newGame}
        />
      </div>
      <Board
        boxes={boxes}
        onCellSelect={onCellSelect}
        resetSelection={resetSelection}
        settings={settings}
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
      <Keyboard annotate={annotate} />
    </div>
  );
}
