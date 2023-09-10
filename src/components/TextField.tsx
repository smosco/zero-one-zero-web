import clsx from 'clsx';

export type TextFieldProps = React.ComponentProps<'input'>;

export default function TextField({ className, ...rest }: TextFieldProps) {
  return <input {...rest} className={clsx('h-12 px-3 py-3 border rounded-lg', className)} />;
}
