import update, { Spec } from 'immutability-helper';
import { useCallback } from 'react';

import mapBoxAndCellToRawIndex from '../lib/mapBoxAndCellToRawIndex';
import { CellState } from './useGameState';

export type UseCellSelectionReturn = ReturnType<typeof useCellSelection>;

export default function useCellSelection(
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
  recentValueRef: React.MutableRefObject<number | null>,
) {
  const onCellSelect = useCallback(
    (
      indexOrBoxAndCell: number | { boxIndex: number; cellIndex: number },
      reset: boolean,
    ) => {
      recentValueRef.current = null;
      setRaw(prev => {
        const rawIndex =
          typeof indexOrBoxAndCell === 'number'
            ? indexOrBoxAndCell
            : mapBoxAndCellToRawIndex(
                indexOrBoxAndCell.boxIndex,
                indexOrBoxAndCell.cellIndex,
              );

        const updateSpec: Spec<CellState[]> = {};

        if (reset) {
          prev.forEach(({ selected }, index) => {
            if (selected) {
              updateSpec[index] = { selected: { $set: false } };
            }
          });
        }

        updateSpec[rawIndex] = { selected: { $set: true } };

        return update(prev, updateSpec);
      });
    },
    [recentValueRef, setRaw],
  );

  const resetSelection = useCallback(() => {
    setRaw(prev => {
      recentValueRef.current = null;
      const updateSpec: Spec<CellState[]> = {};

      prev.forEach(({ selected }, index) => {
        if (selected) {
          updateSpec[index] = { selected: { $set: false } };
        }
      });

      if (Object.keys(updateSpec).length === 0) {
        return prev;
      }

      return update(prev, updateSpec);
    });
  }, [recentValueRef, setRaw]);

  return { onCellSelect, resetSelection };
}
