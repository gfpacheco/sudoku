import createNineObjects from '../lib/createNineObjects';
import mapRawToBoxIndex from '../lib/mapRawToBoxIndex';
import mapRawToColumnIndex from './mapRawToColumnIndex';
import mapRawToRowIndex from './mapRawToRowIndex';
import { CellState } from './useGameState';

export default function useErrors(raw: CellState[]) {
  const boxes = createNineObjects();
  const rows = createNineObjects();
  const columns = createNineObjects();

  raw.forEach(({ value }, index) => {
    if (value === 0) {
      return;
    }

    boxes[mapRawToBoxIndex(index)][value] += 1;
    rows[mapRawToRowIndex(index)][value] += 1;
    columns[mapRawToColumnIndex(index)][value] += 1;
  });

  return raw.map((cellState, index) => {
    if (
      cellState.value === 0 ||
      cellState.fixed ||
      (boxes[mapRawToBoxIndex(index)][cellState.value] === 1 &&
        rows[mapRawToRowIndex(index)][cellState.value] === 1 &&
        columns[mapRawToColumnIndex(index)][cellState.value] === 1)
    ) {
      return cellState;
    }

    return {
      ...cellState,
      error: true,
    };
  });
}
