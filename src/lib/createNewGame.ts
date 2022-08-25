import sudoku from 'sudoku';

import { CellState } from '../hooks/useGameState';

export default function createNewGame(): CellState[] {
  return (sudoku.makepuzzle() as number[]).map(value => ({
    value: (value ?? -1) + 1,
    fixed: value !== null,
    selected: false,
    annotations: {
      corner: [],
      center: [],
    },
  }));
}
