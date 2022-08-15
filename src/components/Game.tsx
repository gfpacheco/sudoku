import classNames from 'classnames';

import useNewGame from '../hooks/useNewGame';
import { Difficulty } from './App';

export interface GameProps extends React.ComponentPropsWithoutRef<'div'> {
  difficulty: Difficulty;
}

const zeroToEight = Array.from({ length: 9 }, (_, i) => i);
const zeroToTwo = Array.from({ length: 3 }, (_, i) => i);

export default function Game({ className, difficulty, ...rest }: GameProps) {
  const { loading, error, data: newGame } = useNewGame(difficulty);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!newGame) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={classNames(
        className,
        'grid grid-cols-3 gap-[2px] bg-slate-500 border-2 border-slate-500',
      )}
      {...rest}
    >
      {zeroToEight.map(box => (
        <div key={box} className="grid grid-cols-3 gap-px">
          {zeroToTwo.map(row =>
            zeroToTwo.map(col => (
              <div
                key={col}
                className="flex items-center justify-center w-8 h-8 bg-white"
              >
                {newGame[Math.floor(box / 3) * 3 + row][((box * 3) % 9) + col]}
              </div>
            )),
          )}
        </div>
      ))}
    </div>
  );
}
