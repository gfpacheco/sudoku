import update, { Spec } from 'immutability-helper';

import mapBoxAndCellToRawIndex from '../lib/mapBoxAndCellToRawIndex';
import mapColumnAndCellToRawIndex from '../lib/mapColumnAndCellToRawIndex';
import mapRawToBoxIndex from '../lib/mapRawToBoxIndex';
import mapRawToColumnIndex from '../lib/mapRawToColumnIndex';
import mapRawToRowIndex from '../lib/mapRawToRowIndex';
import mapRowAndCellToRawIndex from '../lib/mapRowAndCellToRawIndex';
import { CellState } from './useGameState';

export default function useAutoAnnotate(
  state: CellState[],
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
): () => void {
  return () => {
    const centerAnnotations = state.map(
      () => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    );

    state.forEach((cell, index) => {
      if (!cell.value) {
        return;
      }

      centerAnnotations[index].clear();

      const rowIndex = mapRawToRowIndex(index);
      const columnIndex = mapRawToColumnIndex(index);
      const boxIndex = mapRawToBoxIndex(index);

      for (let i = 0; i < 9; i++) {
        centerAnnotations[mapRowAndCellToRawIndex(rowIndex, i)].delete(
          cell.value,
        );
        centerAnnotations[mapColumnAndCellToRawIndex(columnIndex, i)].delete(
          cell.value,
        );
        centerAnnotations[mapBoxAndCellToRawIndex(boxIndex, i)].delete(
          cell.value,
        );
      }
    });

    setRaw(prev => {
      const updateSpec: Spec<CellState[]> = {};

      prev.forEach((_, index) => {
        updateSpec[index] = {
          annotations: {
            $set: {
              corner: [],
              center: Array.from(centerAnnotations[index]),
            },
          },
        };
      });

      return update(prev, updateSpec);
    });
  };
}
