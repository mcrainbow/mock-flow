import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar';

export const AppLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen overflow-hidden">
      <Header />
      <div className="grid grid-cols-[auto_1fr] overflow-hidden bg-background">
        <Sidebar />
        <main className="overflow-y-auto px-10 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
