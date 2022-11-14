import update, { Spec } from 'immutability-helper';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CellState } from './useGameState';

export type UseGameHistoryReturn = ReturnType<typeof useGameHistory>;

export default function useGameHistory(
  raw: CellState[],
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
) {
  const [history, setHistory] = useState<CellState[][]>([raw]);
  const [index, setIndex] = useState(0);
  const previousStateRef = useRef<CellState[]>(raw);

  const setRawKeepingSelection = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= history.length) {
        return;
      }

      setIndex(newIndex);
      setRaw(prev => {
        const updateSpec: Spec<CellState[]> = {};

        prev.forEach((_, index) => {
          updateSpec[index] = {
            selected: {
              $set: raw[index].selected,
            },
          };
        });

        const newRaw = update(history[newIndex], updateSpec);

        setHistory(update(history, { [newIndex]: { $set: newRaw } }));

        return newRaw;
      });
    },
    [history, raw, setRaw],
  );

  const undo = useCallback(() => {
    setRawKeepingSelection(index - 1);
  }, [index, setRawKeepingSelection]);

  const redo = useCallback(() => {
    setRawKeepingSelection(index + 1);
  }, [index, setRawKeepingSelection]);

  useEffect(() => {
    const someCellChanged = raw.some(
      (cell, i) =>
        cell.value !== previousStateRef.current[i].value ||
        cell.annotations !== previousStateRef.current[i].annotations,
    );
    previousStateRef.current = raw;

    if (!someCellChanged) {
      return;
    }

    if (!history.includes(raw)) {
      setHistory([...history.slice(0, index + 1), raw]);
      setIndex(index + 1);
    }
  }, [history, index, raw]);

  return { undo, redo };
}
