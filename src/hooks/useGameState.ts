import { useState } from 'react';

import { Difficulty } from '../components/App';
import useAnnotation, { UseAnnotationReturn } from './useAnnotation';
import useBoxes from './useBoxes';
import useCellSelection, { UseCellSelectionReturn } from './useCellSelection';
import useErrors from './useErrors';
import useGameKeyboard from './useGameKeyboard';
import useNewGame from './useNewGame';

export type GameState = UseCellSelectionReturn &
  UseAnnotationReturn & {
    loading: boolean;
    error?: string;
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

const blankState = Array.from({ length: 81 }, () => ({
  value: 0,
  fixed: false,
  selected: false,
  error: false,
  annotations: {
    corner: [],
    center: [],
  },
}));

export default function useGameState(difficulty: Difficulty): GameState {
  const [raw, setRaw] = useState<CellState[]>(blankState);
  const { loading, error } = useNewGame(difficulty, setRaw);
  const cellSelection = useCellSelection(setRaw);
  const annotation = useAnnotation(setRaw);
  const cellStates = useErrors(raw);
  const boxes = useBoxes(cellStates);

  useGameKeyboard(raw, cellSelection, annotation);

  return {
    loading,
    error,
    raw,
    boxes,
    ...cellSelection,
    ...annotation,
  };
}
