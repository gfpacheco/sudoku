import mapRawToBoxIndex from './mapRawToBoxIndex';

export default function mapRawToBoxAndCellIndex(index: number) {
  return {
    box: mapRawToBoxIndex(index),
    cell: (index % 3) + Math.floor(index / 9) * 3,
  };
}
