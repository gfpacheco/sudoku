import { useCallback } from 'react';

import createNewGame from '../lib/createNewGame';
import { CellState } from './useGameState';

export default function useNewGame(
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
  resetTimer: () => void,
  recentValueRef: React.MutableRefObject<number | null>,
) {
  return useCallback(() => {
    recentValueRef.current = null;
    setRaw(createNewGame());
    resetTimer();
  }, [recentValueRef, resetTimer, setRaw]);
}
