import classNames from 'classnames';

export interface BoardProps extends React.ComponentPropsWithoutRef<'div'> {
  boxes: number[][];
}

export default function Board({ className, boxes, ...rest }: BoardProps) {
  return (
    <div
      className={classNames(
        className,
        'grid grid-cols-3 gap-[2px] bg-slate-500 border-2 border-slate-500',
      )}
      {...rest}
    >
      {boxes.map((box, index) => (
        <div key={index} className="grid grid-cols-3 gap-px">
          {box.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-8 sm:w-12 h-8 sm:h-12 sm:text-2xl bg-white"
            >
              {item || ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
