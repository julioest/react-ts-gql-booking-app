import { ToastProps } from '@/types';
import { ClassAttributes, HTMLAttributes } from 'react';
import useTimeout from './use-timeout.hooks';

export const ToastContainer = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) => (
  <div
    className="mx-auto sm:w-3/4 md:w-2/4 fixed inset-x-0 top-10"
    {...props}
  />
);

export default function Toast<T>({
  children,
  id,
  onDismiss = () => {},
}: ToastProps<T>) {
  useTimeout(() => {
    onDismiss(id);
  }, 2500);

  return (
    <div
      className="flex p-4 text-xl bg-white border rounded-md mb-2 shadow-sm center w-fit mx-auto"
      onClick={() => {
        onDismiss(id);
      }}
    >
      {children}
    </div>
  );
}
