import classNames from 'classnames';

import Button from './Button';

export interface UpdateNotificationProps
  extends React.ComponentPropsWithoutRef<'div'> {
  onUpdate: () => void;
}

export default function UpdateNotification({
  className,
  onUpdate,
  ...rest
}: UpdateNotificationProps) {
  return (
    <div
      className={classNames(
        className,
        'fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-sm rounded-lg bg-slate-800 p-2 pl-4 flex items-center justify-between text-white',
      )}
      {...rest}
    >
      <span>Update available</span>
      <Button onClick={onUpdate}>Reload and Update</Button>
    </div>
  );
}
