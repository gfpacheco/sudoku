import { useMemo } from 'react';

import { ComputedCellState } from './useGameState';

export default function useComplete(computed: ComputedCellState[]): boolean {
  const complete = useMemo(() => {
    return computed.every(cell => cell.value && !cell.error);
  }, [computed]);

  return complete;
}
