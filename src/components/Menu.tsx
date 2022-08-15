import classNames from 'classnames';

import { allDifficulties, Difficulty } from './App';
import Button from './Button';

export interface MenuProps extends React.ComponentPropsWithoutRef<'div'> {
  setDifficulty: (difficulty: Difficulty) => void;
}

export default function Menu({ className, setDifficulty, ...rest }: MenuProps) {
  return (
    <div className={classNames(className, 'grid gap-4')} {...rest}>
      <h1 className="text-center text-lg font-bold">New Game</h1>
      {allDifficulties.map(difficulty => (
        <Button
          key={difficulty}
          className="capitalize"
          onClick={() => setDifficulty(difficulty)}
        >
          {difficulty}
        </Button>
      ))}
    </div>
  );
}
