import { ReactNode, useState } from 'react';
import { ToastProps, ToastProviderProps } from '@/types';
import Toast, { ToastContainer } from './Toast';
import { ToastContext } from './ToastContext';

let toastCount = 0;

export function ToastProvider<T>({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps<T>[]>([]);

  const add = (content: T) => {
    const newToast: ToastProps<T> = {
      content,
      id: toastCount++,
    };

    setToasts((currentToasts) => [...currentToasts, newToast]);
  };

  const remove = () => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastCount)
    );
  };

  const handleDismiss = (id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => {
        return toast.id !== id;
      })
    );
  };

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}
      <ToastContainer>
        {toasts.map(({ content, id = 0 }) => (
          <Toast
            key={`toast-${id}`}
            onDismiss={() => handleDismiss(id as number)}
          >
            {content as React.ReactNode}
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
