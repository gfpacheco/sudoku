import { useMemo } from 'react';

import { createNineArrays } from '../lib/createNineArrays';
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
