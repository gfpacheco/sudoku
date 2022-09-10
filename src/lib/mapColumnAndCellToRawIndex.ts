export default function mapColumnAndCellToRawIndex(
  column: number,
  cell: number,
) {
  return column + cell * 9;
}
