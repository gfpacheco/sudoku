export default function mapBoxAndCellToRawIndex(box: number, cell: number) {
  return (
    Math.floor(box / 3) * 18 + box * 3 + Math.floor(cell / 3) * 9 + (cell % 3)
  );
}
