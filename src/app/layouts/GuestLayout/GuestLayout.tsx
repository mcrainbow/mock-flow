import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router-dom';
import { cn } from '@/shared/lib';

export const GuestLayout = () => {
  return (
    <div>
      <Header />
      <main className={cn('pt-30')}>
        <Outlet />
      </main>
    </div>
  );
};
