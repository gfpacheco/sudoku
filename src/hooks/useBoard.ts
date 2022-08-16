import { useMemo } from 'react';

export default function useBoard(raw: number[]) {
  return useMemo(() => {
    const boxes = createNineArrays();
    const rows = createNineArrays();
    const columns = createNineArrays();

    raw.forEach((value, index) => {
      const boxIndex =
        (Math.floor((index % 9) / 3) % 9) + Math.floor(index / 27) * 3;
      boxes[boxIndex].push(value);

      const rowIndex = Math.floor(index / 9);
      rows[rowIndex].push(value);

      const columnIndex = index % 9;
      columns[columnIndex].push(value);
    });

    return {
      boxes,
      rows,
      columns,
    };
  }, [raw]);
}

function createNineArrays() {
  return Array.from({ length: 9 }, () => [] as number[]);
}
