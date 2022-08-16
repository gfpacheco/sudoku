import { useEffect, useState } from 'react';

import { Difficulty } from '../components/App';
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
}

export interface CellState {
  value: number;
  fixed: boolean;
  selected: boolean;
}

export default function useGameState(difficulty: Difficulty): GameState {
  const { loading, error, initialState } = useNewGame(difficulty);
  const [raw, setRaw] = useState<CellState[]>(new Array(81).fill(0));

  useEffect(() => {
    if (initialState) {
      setRaw(initialState);
    }
  }, [initialState]);

  const { boxes, rows, columns } = useBoard(raw);

  const cellSelection = useCellSelection(setRaw);

  return {
    loading,
    error,
    raw,
    boxes,
    rows,
    columns,
    ...cellSelection,
  };
}
