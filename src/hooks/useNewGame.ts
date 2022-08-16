import { useEffect, useState } from 'react';

import { Difficulty } from '../components/App';

export interface NewGameState {
  loading: boolean;
  error?: string;
  initialState?: number[];
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
          initialState: data.board.flat(),
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
