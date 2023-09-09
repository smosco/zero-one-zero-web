import clsx from 'clsx';

interface TextAreaProps extends React.ComponentProps<'textarea'> {}

export default function TextArea(props: TextAreaProps) {
  const { className, ...rest } = props;
  return <textarea {...rest} className={clsx('h-12 px-3 py-3 border rounded-lg', className)} />;
}
