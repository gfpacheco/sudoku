import { AnnotationType, UseAnnotationReturn } from './useAnnotation';
import { UseCellSelectionReturn } from './useCellSelection';
import useDocumentListener from './useDocumentListener';
import { UseGameHistoryReturn } from './useGameHistory';
import { CellState } from './useGameState';

const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const keysDirection: Record<string, Direction> = {
  ArrowUp: Direction.UP,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
  ArrowRight: Direction.RIGHT,
  k: Direction.UP,
  j: Direction.DOWN,
  h: Direction.LEFT,
  l: Direction.RIGHT,
};

const directionOffset: Record<Direction, number> = {
  [Direction.UP]: -9,
  [Direction.DOWN]: 9,
  [Direction.LEFT]: -1,
  [Direction.RIGHT]: 1,
};

export default function useGameKeyboard(
  raw: CellState[],
  { onCellSelect, resetSelection }: UseCellSelectionReturn,
  { setCurrentAnnotationType, annotate, clearCell }: UseAnnotationReturn,
  { undo, redo }: UseGameHistoryReturn,
) {
  useDocumentListener('keydown', (e) => {
    const event = e as KeyboardEvent;
    const key = event.key;

    switch (key) {
      case 'Backspace':
        return clearCell();
      case 'Delete':
        return clearCell();
      case 'Escape':
        return resetSelection();
      case 'q':
        return setCurrentAnnotationType(AnnotationType.normal);
      case 'w':
        return setCurrentAnnotationType(AnnotationType.corner);
      case 'e':
        return setCurrentAnnotationType(AnnotationType.center);
      case 'z':
        if (event.ctrlKey || event.metaKey) {
          if (event.shiftKey) {
            redo();
          } else {
            undo();
          }
        }
        return;
      case 'y':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          redo();
        }
        return;
    }

    if (numberKeys.includes(key)) {
      const number = parseInt(key, 10);
      return annotate(number);
    }

    const direction = keysDirection[key];

    if (direction) {
      const moveOffset = directionOffset[direction];
      const firstSelectedCell = raw.findIndex(({ selected }) => selected);

      const isValidMove =
        (moveOffset === -9 && firstSelectedCell >= 9) ||
        (moveOffset === 9 && firstSelectedCell < 72) ||
        (moveOffset === -1 && firstSelectedCell % 9 !== 0) ||
        (moveOffset === 1 && firstSelectedCell % 9 !== 8);

      if (isValidMove) {
        onCellSelect(firstSelectedCell + moveOffset, true);
      }
    }
  });
}
