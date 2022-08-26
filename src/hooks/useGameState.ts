

import computeCellStates from '../lib/computeCellStates';
import createNewGame from '../lib/createNewGame';
import useAnnotation, { UseAnnotationReturn } from './useAnnotation';
import useBoxes from './useBoxes';
import useCellSelection, { UseCellSelectionReturn } from './useCellSelection';
import useGameKeyboard from './useGameKeyboard';
import usePersistentState from './usePersistentState';
import useSettings, { UseSettingsReturn } from './useSettings';

export type GameState = UseCellSelectionReturn &
  UseAnnotationReturn &
  UseSettingsReturn & {
    boxes: ComputedCellState[][];
  };

export interface CellState {
  value: number;
  fixed: boolean;
  selected: boolean;
  annotations: {
    corner: number[];
    center: number[];
  };
}

export interface ComputedCellState extends CellState {
  highlighted: boolean;
  forbidden: boolean;
  error: boolean;
}

export default function useGameState(): GameState {
  const [raw, setRaw] = usePersistentState<CellState[]>(
    () => createNewGame(),
    'gameState',
  );
  const cellSelection = useCellSelection(setRaw);
  const annotation = useAnnotation(setRaw);
  const computed = computeCellStates(raw);
  const boxes = useBoxes(computed);
  const settings = useSettings();

  useGameKeyboard(raw, cellSelection, annotation);

  return {
    boxes,
    ...cellSelection,
    ...annotation,
    ...settings,
  };
}
