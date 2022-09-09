import { useCallback, useEffect, useRef, useState } from 'react';

import { CellState } from './useGameState';

export type UseGameHistoryReturn = ReturnType<typeof useGameHistory>;

export default function useGameHistory(
  state: CellState[],
  setState: (state: CellState[]) => void,
): {
  undo: () => void;
  redo: () => void;
} {
  const [history, setHistory] = useState<CellState[][]>([state]);
  const [index, setIndex] = useState(0);
  const previousStateRef = useRef<CellState[]>(state);

  const undo = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
      setState(history[index - 1]);
    }
  }, [index, history, setState]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      setIndex(index + 1);
      setState(history[index + 1]);
    }
  }, [index, history, setState]);

  useEffect(() => {
    const someCellChanged = state.some(
      (cell, i) =>
        cell.value !== previousStateRef.current[i].value ||
        cell.annotations !== previousStateRef.current[i].annotations,
    );
    previousStateRef.current = state;

    if (!someCellChanged) {
      return;
    }

    if (history.includes(state)) {
      setIndex(history.indexOf(state));
    } else {
      setHistory([...history.slice(0, index + 1), state]);
      setIndex(index + 1);
    }
  }, [history, index, state]);

  return { undo, redo };
}
