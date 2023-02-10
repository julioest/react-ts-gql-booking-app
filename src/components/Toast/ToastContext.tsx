import { ToastContextProps } from '@/types';
import { createContext, useContext } from 'react';

export const ToastContext = createContext<ToastContextProps>({
  add: () => {},
  remove: () => {},
});

export const useToasts = () => useContext(ToastContext);
