import { useEffect, useState } from 'react';

import { Difficulty } from '../components/App';
import useBoard from './useBoard';
import useNewGame from './useNewGame';

export interface GameState {
  loading: boolean;
  error?: string;
  raw: number[];
  boxes: number[][];
  rows: number[][];
  columns: number[][];
}

export default function useGameState(difficulty: Difficulty): GameState {
  const { loading, error, initialState } = useNewGame(difficulty);
  const [raw, setRaw] = useState<number[]>(new Array(81).fill(0));

  useEffect(() => {
    if (initialState) {
      setRaw(initialState);
    }
  }, [initialState]);

  const { boxes, rows, columns } = useBoard(raw);

  return {
    loading,
    error,
    raw,
    boxes,
    rows,
    columns,
  };
}
