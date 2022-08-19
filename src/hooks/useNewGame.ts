import { useEffect, useState } from 'react';

import { Difficulty } from '../components/App';
import { CellState } from './useGameState';

export interface NewGameState {
  loading: boolean;
  error?: string;
}

export default function useNewGame(
  difficulty: Difficulty,
  setRaw: React.Dispatch<React.SetStateAction<CellState[]>>,
) {
  const [newGame, setNewGame] = useState<NewGameState>({
    loading: true,
  });

  useEffect(() => {
    console.log('difficulty', difficulty);
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(res => res.json())
      .then((data: { board: number[][] }) => {
        setNewGame({ loading: false });
        setRaw(
          data.board.flat().map(
            (value): CellState => ({
              value,
              fixed: value !== 0,
              selected: false,
              error: false,
              annotations: {
                corner: [],
                center: [],
              },
            }),
          ),
        );
      })
      .catch(error => {
        setNewGame({
          loading: false,
          error: error.message,
        });
      });
  }, [difficulty, setRaw]);

  return newGame;
}
