import update, { Spec } from 'immutability-helper';
import { useCallback } from 'react';

import { CellState } from './useGameState';

export default function useReset(
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
) {
  return useCallback(
    () =>
      setRaw(prev => {
        const updateSpec: Spec<CellState[]> = {};

        prev.forEach(({ fixed }, index) => {
          if (fixed) {
            return;
          }

          updateSpec[index] = {
            value: { $set: 0 },
            annotations: { $set: { corner: [], center: [] } },
          };
        });

        if (Object.keys(updateSpec).length === 0) {
          return prev;
        }

        return update(prev, updateSpec);
      }),
    [setRaw],
  );
}
