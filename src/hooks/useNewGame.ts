import { useEffect, useState } from 'react';

import { Difficulty } from '../components/App';

export interface Fetch<T> {
  loading: boolean;
  error?: string;
  data?: T;
}

export default function useNewGame(difficulty: Difficulty) {
  const [newGame, setNewGame] = useState<Fetch<number[][]>>({
    loading: true,
  });

  useEffect(() => {
    console.log('difficulty', difficulty);
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        setNewGame({
          loading: false,
          data: data.board,
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
