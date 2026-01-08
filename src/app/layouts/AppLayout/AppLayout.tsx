import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router-dom';
import { cn } from '@/shared/lib';

type LayoutVariant = 'app' | 'guest';

export default function AppLayout({ variant }: { variant: LayoutVariant }) {
  return (
    <div>
      <Header />
      <main className={cn(variant === 'guest' ? 'pt-30' : 'pt-0')}>
        <Outlet />
      </main>
    </div>
  );
}
