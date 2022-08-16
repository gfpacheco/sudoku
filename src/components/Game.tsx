import useGameState from '../hooks/useGameState';
import { Difficulty } from './App';
import Board from './Board';

export interface GameProps extends React.ComponentPropsWithoutRef<'div'> {
  difficulty: Difficulty;
}

export default function Game({ difficulty, ...rest }: GameProps) {
  const { loading, error, boxes, onCellSelect, resetSelection } =
    useGameState(difficulty);

  if (loading) {
    return <div {...rest}>Loading...</div>;
  }

  if (error) {
    return <div {...rest}>Error: {error}</div>;
  }

  return (
    <Board
      boxes={boxes}
      onCellSelect={onCellSelect}
      resetSelection={resetSelection}
      {...rest}
    />
  );
}
