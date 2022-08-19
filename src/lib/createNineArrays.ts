import { CellState } from '../hooks/useGameState';

export function createNineArrays() {
  return Array.from({ length: 9 }, () => [] as CellState[]);
}
