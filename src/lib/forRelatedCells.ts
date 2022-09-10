import mapBoxAndCellToRawIndex from './mapBoxAndCellToRawIndex';
import mapColumnAndCellToRawIndex from './mapColumnAndCellToRawIndex';
import mapRawToBoxIndex from './mapRawToBoxIndex';
import mapRawToColumnIndex from './mapRawToColumnIndex';
import mapRawToRowIndex from './mapRawToRowIndex';
import mapRowAndCellToRawIndex from './mapRowAndCellToRawIndex';

export default function forRelatedCells(
  index: number,
  callback: (cellIndex: number) => void,
) {
  const calledIndexes: Record<number, boolean> = {};

  const box = mapRawToBoxIndex(index);
  for (let cell = 0; cell < 9; cell++) {
    const rawIndex = mapBoxAndCellToRawIndex(box, cell);
    if (rawIndex !== index) {
      calledIndexes[rawIndex] = true;
      callback(rawIndex);
    }
  }

  const row = mapRawToRowIndex(index);
  for (let cell = 0; cell < 9; cell++) {
    const rawIndex = mapRowAndCellToRawIndex(row, cell);
    if (rawIndex !== index && !calledIndexes[rawIndex]) {
      calledIndexes[rawIndex] = true;
      callback(rawIndex);
    }
  }

  const column = mapRawToColumnIndex(index);
  for (let cell = 0; cell < 9; cell++) {
    const rawIndex = mapColumnAndCellToRawIndex(column, cell);
    if (rawIndex !== index && !calledIndexes[rawIndex]) {
      calledIndexes[rawIndex] = true;
      callback(rawIndex);
    }
  }
}
