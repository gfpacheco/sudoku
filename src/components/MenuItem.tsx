import classNames from 'classnames';

export interface MenuItemProps
  extends React.ComponentPropsWithoutRef<'button'> {}

export default function MenuItem({ className, ...rest }: MenuItemProps) {
  return (
    <button
      className={classNames(
        className,
        'px-4 py-2 hover:bg-slate-50 cursor-pointer flex justify-between items-center capitalize',
      )}
      type="button"
      {...rest}
    />
  );
}
