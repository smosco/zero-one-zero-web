import clsx from 'clsx';

export type ButtonProps = React.ComponentProps<'button'>;

export default function Button(props: ButtonProps) {
  const { type = 'button', disabled = false, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={clsx('p-3 rounded-lg bg-indigo-500 text-white', className, {
        'bg-gray-400': disabled,
      })}
      type={type}
      disabled={disabled}
    />
  );
}
