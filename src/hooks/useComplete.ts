import { useEffect, useMemo } from 'react';

import { ComputedCellState } from './useGameState';

export default function useComplete(
  computed: ComputedCellState[],
  resetSelection: () => void,
): boolean {
  const complete = useMemo(() => {
    return computed.every(cell => cell.value && !cell.error);
  }, [computed]);

  useEffect(() => {
    if (complete) {
      resetSelection();
    }
  }, [complete, resetSelection]);

  return complete;
}
