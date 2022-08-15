import classNames from 'classnames';

import { Dificulty } from './App';

export interface GameProps extends React.ComponentPropsWithoutRef<'div'> {
  dificulty: Dificulty;
}

export default function Game({ className, ...rest }: GameProps) {
  return <div className={classNames(className, '')} {...rest} />;
}
