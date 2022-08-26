import update, { Spec } from 'immutability-helper';

import { CellState } from './useGameState';

export type UseResetReturn = ReturnType<typeof useReset>;

export default function useReset(
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
) {
  return () =>
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
    });
}
