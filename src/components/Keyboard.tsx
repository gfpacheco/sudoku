import classNames from 'classnames';

import stopPropagation from '../lib/stopPropagation';
import Button from './Button';

export interface KeyboardProps extends React.ComponentPropsWithoutRef<'div'> {
  annotate: (newValue: number) => void;
}

export default function Keyboard({
  className,
  annotate,
  ...rest
}: KeyboardProps) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (!isMobile) {
    return null;
  }

  return (
    <div
      className={classNames(className, 'mt-2 px-1 grid grid-cols-9 gap-2')}
      {...rest}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
        <Button
          key={value}
          className="px-0"
          onClick={() => annotate(value)}
          onMouseDown={stopPropagation}
        >
          {value}
        </Button>
      ))}
    </div>
  );
}
