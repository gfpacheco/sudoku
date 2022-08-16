import update, { Spec } from 'immutability-helper';

import mapBoxAndCellToRawIndex from '../lib/mapBoxAndCellToRawIndex';
import { CellState } from './useGameState';

export default function useCellSelection(
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
) {
  function onCellSelect(box: number, cell: number, reset: boolean) {
    setRaw(prev => {
      const rawIndex = mapBoxAndCellToRawIndex(box, cell);
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
  }

  function resetSelection() {
    setRaw(prev => {
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
  }

  return { onCellSelect, resetSelection };
}
