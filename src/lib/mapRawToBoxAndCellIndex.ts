export default function mapRawToBoxAndCellIndex(index: number) {
  return {
    box: (Math.floor((index % 9) / 3) % 9) + Math.floor(index / 27) * 3,
    cell: (index % 3) + Math.floor(index / 9) * 3,
  };
}
