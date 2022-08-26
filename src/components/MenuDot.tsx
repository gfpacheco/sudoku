import classNames from 'classnames';

export interface MenuDotProps extends React.ComponentPropsWithoutRef<'span'> {}

export default function MenuDot({ className, ...rest }: MenuDotProps) {
  return (
    <span
      className={classNames(className, 'relative w-1 h-1 rounded bg-slate-500')}
      {...rest}
    />
  );
}
