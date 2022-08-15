import { useState } from 'react';

import Game from './Game';
import Menu from './Menu';

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export const allDifficulties = Object.keys(Difficulty) as Difficulty[];

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>();

  return (
    <div className="h-full flex items-center justify-center">
      {difficulty ? (
        <Game difficulty={difficulty} />
      ) : (
        <Menu setDifficulty={setDifficulty} />
      )}
    </div>
  );
}

export default App;
