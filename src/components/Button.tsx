import classNames from 'classnames';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  secondary?: boolean;
}

export default function Button({
  className,
  type = 'button',
  disabled,
  secondary,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classNames(
        className,
        'rounded px-4 py-2 font-bold',
        disabled && 'opacity-30',
        secondary
          ? 'border-slate-700 border-2 text-slate-700'
          : 'bg-slate-700 text-white',
      )}
      type={type}
      disabled={disabled}
      {...rest}
    />
  );
}
