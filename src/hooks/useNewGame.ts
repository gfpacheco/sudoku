import { useCallback } from 'react';

import createNewGame from '../lib/createNewGame';
import { CellState } from './useGameState';

export default function useNewGame(
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
) {
  return useCallback(() => setRaw(createNewGame()), [setRaw]);
}
