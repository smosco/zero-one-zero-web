import clsx from 'clsx';

export type TextAreaProps = React.ComponentProps<'textarea'>;

export default function TextArea({ className, ...rest }: TextAreaProps) {
  return <textarea {...rest} className={clsx('h-12 px-3 py-3 border rounded-lg', className)} />;
}
