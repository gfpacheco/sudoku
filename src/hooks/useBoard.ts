import { useMemo } from 'react';

import mapRawToBoxAndCellIndex from '../lib/mapRawToBoxAndCellIndex';
import { CellState } from './useGameState';

export default function useBoard(raw: CellState[]) {
  return useMemo(() => {
    const boxes = createNineArrays();
    const rows = createNineArrays();
    const columns = createNineArrays();

    raw.forEach((cell, index) => {
      boxes[mapRawToBoxAndCellIndex(index).box].push(cell);

      const rowIndex = Math.floor(index / 9);
      rows[rowIndex].push(cell);

      const columnIndex = index % 9;
      columns[columnIndex].push(cell);
    });

    return {
      boxes,
      rows,
      columns,
    };
  }, [raw]);
}

function createNineArrays() {
  return Array.from({ length: 9 }, () => [] as CellState[]);
}
