import { useState } from 'react';

import { Difficulty } from '../components/App';
import useAnnotation, { AnnotationType } from './useAnnotation';
import useBoxes from './useBoxes';
import useCellSelection from './useCellSelection';
import useNewGame from './useNewGame';

export interface GameState {
  loading: boolean;
  error?: string;
  raw: CellState[];
  boxes: CellState[][];
  onCellSelect: (box: number, cell: number, reset: boolean) => void;
  resetSelection: () => void;
  currentAnnotationType: AnnotationType;
  setCurrentAnnotationType: (annotationType: AnnotationType) => void;
  annotate: (value: number) => void;
  clearAnnotation: () => void;
}

export interface CellState {
  value: number;
  fixed: boolean;
  selected: boolean;
  annotations: {
    corner: number[];
    center: number[];
  };
}

const blankState = Array.from({ length: 81 }, () => ({
  value: 0,
  fixed: false,
  selected: false,
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
  const boxes = useBoxes(raw);

  return {
    loading,
    error,
    raw,
    boxes,
    ...cellSelection,
    ...annotation,
  };
}
