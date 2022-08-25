import { useState } from 'react';

import createNewGame from '../lib/createNewGame';
import useAnnotation, { UseAnnotationReturn } from './useAnnotation';
import useBoxes from './useBoxes';
import useCellSelection, { UseCellSelectionReturn } from './useCellSelection';
import useErrors from './useErrors';
import useGameKeyboard from './useGameKeyboard';

export type GameState = UseCellSelectionReturn &
  UseAnnotationReturn & {
    raw: CellState[];
    boxes: CellState[][];
  };

export interface CellState {
  value: number;
  fixed: boolean;
  selected: boolean;
  error: boolean;
  annotations: {
    corner: number[];
    center: number[];
  };
}

export default function useGameState(): GameState {
  const [raw, setRaw] = useState<CellState[]>(() => createNewGame());
  const cellSelection = useCellSelection(setRaw);
  const annotation = useAnnotation(setRaw);
  const cellStates = useErrors(raw);
  const boxes = useBoxes(cellStates);

  useGameKeyboard(raw, cellSelection, annotation);

  return {
    raw,
    boxes,
    ...cellSelection,
    ...annotation,
  };
}
