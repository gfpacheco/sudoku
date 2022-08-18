import { useEffect, useState } from 'react';

import { Difficulty } from '../components/App';
import useAnnotation, { AnnotationType } from './useAnnotation';
import useBoard from './useBoard';
import useCellSelection from './useCellSelection';
import useNewGame from './useNewGame';

export interface GameState {
  loading: boolean;
  error?: string;
  raw: CellState[];
  boxes: CellState[][];
  rows: CellState[][];
  columns: CellState[][];
  onCellSelect: (box: number, cell: number, reset: boolean) => void;
  resetSelection: () => void;
  currentAnnotationType: AnnotationType;
  setCurrentAnnotationType: (annotationType: AnnotationType) => void;
  annotate: (value: number) => void;
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

export default function useGameState(difficulty: Difficulty): GameState {
  const { loading, error, initialState } = useNewGame(difficulty);
  const [raw, setRaw] = useState<CellState[]>(
    Array.from({ length: 81 }, () => ({
      value: 0,
      fixed: false,
      selected: false,
      annotations: {
        corner: [],
        center: [],
      },
    })),
  );

  useEffect(() => {
    if (initialState) {
      setRaw(initialState);
    }
  }, [initialState]);

  const { boxes, rows, columns } = useBoard(raw);

  const cellSelection = useCellSelection(setRaw);
  const annotation = useAnnotation(setRaw);

  return {
    loading,
    error,
    raw,
    boxes,
    rows,
    columns,
    ...cellSelection,
    ...annotation,
  };
}
