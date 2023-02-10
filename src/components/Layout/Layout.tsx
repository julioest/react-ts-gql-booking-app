import { LayoutProps } from '@/types';
import Navbar from '../Navbar';
import { ToastProvider } from '../Toast/ToastProvider';

export default function Layout({ children }: LayoutProps) {
  return (
    <ToastProvider>
      <Navbar />
      <main>{children}</main>
    </ToastProvider>
  );
}
