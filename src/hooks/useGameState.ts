import { useState } from 'react';

import computeCellStates from '../lib/computeCellStates';
import createNewGame from '../lib/createNewGame';
import useAnnotation, { UseAnnotationReturn } from './useAnnotation';
import useBoxes from './useBoxes';
import useCellSelection, { UseCellSelectionReturn } from './useCellSelection';
import useGameKeyboard from './useGameKeyboard';

export type GameState = UseCellSelectionReturn &
  UseAnnotationReturn & {
    boxes: ComputedCellState[][];
  };

export interface CellState {
  value: number;
  fixed: boolean;
  selected: boolean;
  annotations: {
    corner: number[];
    center: number[];
  };
}

export interface ComputedCellState extends CellState {
  highlighted: boolean;
  forbidden: boolean;
  error: boolean;
}

export default function useGameState(): GameState {
  const [raw, setRaw] = useState<CellState[]>(() => createNewGame());
  const cellSelection = useCellSelection(setRaw);
  const annotation = useAnnotation(setRaw);
  const computed = computeCellStates(raw);
  const boxes = useBoxes(computed);

  useGameKeyboard(raw, cellSelection, annotation);

  return {
    boxes,
    ...cellSelection,
    ...annotation,
  };
}
