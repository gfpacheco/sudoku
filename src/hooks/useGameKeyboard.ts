import { AnnotationType, UseAnnotationReturn } from './useAnnotation';
import { UseCellSelectionReturn } from './useCellSelection';
import useDocumentListener from './useDocumentListener';
import { CellState } from './useGameState';

const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function useGameKeyboard(
  raw: CellState[],
  { onCellSelect, resetSelection }: UseCellSelectionReturn,
  { setCurrentAnnotationType, annotate, clearAnnotation }: UseAnnotationReturn,
) {
  useDocumentListener('keydown', event => {
    const key = (event as KeyboardEvent).key;

    if (numberKeys.includes(key)) {
      const number = parseInt(key, 10);
      annotate(number);
    } else if (key === 'Backspace' || key === 'Delete') {
      clearAnnotation();
    } else if (key === 'Escape') {
      resetSelection();
    } else if (key === 'q') {
      setCurrentAnnotationType(AnnotationType.normal);
    } else if (key === 'w') {
      setCurrentAnnotationType(AnnotationType.corner);
    } else if (key === 'e') {
      setCurrentAnnotationType(AnnotationType.center);
    } else if (key.startsWith('Arrow')) {
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
