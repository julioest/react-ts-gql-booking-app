import Link from 'next/link';
import Logo from '@/public/logo.svg';

export default function Navbar() {
  return (
    <nav className="p-6 bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-slate-400/20">
      <div className="container mx-auto">
        <Link href="/">
          <Logo className="w-28 dark:fill-current" aria-label="Spruce logo" />
        </Link>
      </div>
    </nav>
  );
}
