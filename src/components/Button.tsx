import clsx from 'clsx';

interface ButtonProps extends React.ComponentProps<'button'> {}

export default function Button(props: ButtonProps) {
  const { type = 'button', disabled = false, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={clsx('px-3 py-3 border rounded-lg bg-sky-600 border-sky-600 text-white', className, {
        'bg-slate-600 border-slate-600': disabled,
      })}
      type={type}
      disabled={disabled}
    />
  );
}
