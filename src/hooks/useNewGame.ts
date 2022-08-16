import { useEffect, useState } from 'react';

import { Difficulty } from '../components/App';
import { CellState } from './useGameState';

export interface NewGameState {
  loading: boolean;
  error?: string;
  initialState?: CellState[];
}

export default function useNewGame(difficulty: Difficulty) {
  const [newGame, setNewGame] = useState<NewGameState>({
    loading: true,
  });

  useEffect(() => {
    console.log('difficulty', difficulty);
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(res => res.json())
      .then((data: { board: number[][] }) => {
        setNewGame({
          loading: false,
          initialState: data.board.flat().map(
            value =>
              ({
                value,
                fixed: value !== 0,
                selected: false,
              } as CellState),
          ),
        });
      })
      .catch(error => {
        setNewGame({
          loading: false,
          error: error.message,
        });
      });
  }, [difficulty]);

  return newGame;
}
