import { useRef } from 'react';

import computeCellStates from '../lib/computeCellStates';
import createNewGame from '../lib/createNewGame';
import useAnnotation, { UseAnnotationReturn } from './useAnnotation';
import useBoxes from './useBoxes';
import useCellSelection, { UseCellSelectionReturn } from './useCellSelection';
import useComplete from './useComplete';
import useGameGestures from './useGameGestures';
import useGameHistory, { UseGameHistoryReturn } from './useGameHistory';
import useGameKeyboard from './useGameKeyboard';
import useNewGame from './useNewGame';
import usePersistentState from './usePersistentState';
import useRestartGame from './useRestartGame';
import useSettings, { UseSettingsReturn } from './useSettings';
import useTimer, { UseTimerReturn } from './useTimer';

export type GameState = UseCellSelectionReturn &
  UseAnnotationReturn &
  UseSettingsReturn &
  UseTimerReturn &
  UseGameHistoryReturn & {
    complete: boolean;
    boxes: ComputedCellState[][];
    restartGame: () => void;
    newGame: () => void;
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
  const recentValueRef = useRef<number | null>(null);
  const restartGame = useRestartGame(setRaw, recentValueRef);
  const cellSelection = useCellSelection(setRaw, recentValueRef);
  const annotation = useAnnotation(setRaw, recentValueRef);
  const computed = computeCellStates(raw, recentValueRef);
  const boxes = useBoxes(computed);
  const settings = useSettings();
  const complete = useComplete(computed, cellSelection.resetSelection);
  const timer = useTimer(complete);
  const history = useGameHistory(raw, setRaw);
  const newGame = useNewGame(setRaw, timer.resetTimer, recentValueRef);

  useGameKeyboard(raw, cellSelection, annotation, history);
  useGameGestures(history);

  return {
    boxes,
    restartGame,
    newGame,
    complete,
    ...cellSelection,
    ...annotation,
    ...settings,
    ...timer,
    ...history,
  };
}
