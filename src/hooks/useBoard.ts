import { useMemo } from 'react';

import { CellState } from './useGameState';

export default function useBoard(raw: CellState[]) {
  return useMemo(() => {
    const boxes = createNineArrays();
    const rows = createNineArrays();
    const columns = createNineArrays();

    raw.forEach((cell, index) => {
      const boxIndex =
        (Math.floor((index % 9) / 3) % 9) + Math.floor(index / 27) * 3;
      boxes[boxIndex].push(cell);

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
