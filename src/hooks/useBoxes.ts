import { useMemo } from 'react';

import mapRawToBoxAndCellIndex from '../lib/mapRawToBoxAndCellIndex';
import { CellState } from './useGameState';

export default function useBoxes(raw: CellState[]) {
  return useMemo(() => {
    const boxes = createNineArrays();

    raw.forEach((cell, index) => {
      boxes[mapRawToBoxAndCellIndex(index).box].push(cell);
    });

    return boxes;
  }, [raw]);
}

function createNineArrays() {
  return Array.from({ length: 9 }, () => [] as CellState[]);
}
