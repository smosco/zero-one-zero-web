import clsx from 'clsx';

interface TextFieldProps extends React.ComponentProps<'input'> {}

export default function TextField(props: TextFieldProps) {
  const { className, ...rest } = props;
  return <input {...rest} className={clsx('h-12 px-3 py-3 border rounded-lg', className)} />;
}
