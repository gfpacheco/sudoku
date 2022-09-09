import { AnnotationType, UseAnnotationReturn } from './useAnnotation';
import { UseCellSelectionReturn } from './useCellSelection';
import useDocumentListener from './useDocumentListener';
import { UseGameHistoryReturn } from './useGameHistory';
import { CellState } from './useGameState';

const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function useGameKeyboard(
  raw: CellState[],
  { onCellSelect, resetSelection }: UseCellSelectionReturn,
  { setCurrentAnnotationType, annotate, clearAnnotation }: UseAnnotationReturn,
  { undo, redo }: UseGameHistoryReturn,
) {
  useDocumentListener('keydown', e => {
    const event = e as KeyboardEvent;
    const key = event.key;

    switch (key) {
      case 'Backspace':
        return clearAnnotation();
      case 'Delete':
        return clearAnnotation();
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

    if (key.startsWith('Arrow')) {
      const firstSelectedCell = raw.findIndex(({ selected }) => selected);

      if (key === 'ArrowUp' && firstSelectedCell >= 9) {
        onCellSelect(firstSelectedCell - 9, true);
      } else if (key === 'ArrowDown' && firstSelectedCell < 72) {
        onCellSelect(firstSelectedCell + 9, true);
      } else if (key === 'ArrowLeft' && firstSelectedCell % 9 !== 0) {
        onCellSelect(firstSelectedCell - 1, true);
      } else if (key === 'ArrowRight' && firstSelectedCell % 9 !== 8) {
        onCellSelect(firstSelectedCell + 1, true);
      }
    }
  });
}
