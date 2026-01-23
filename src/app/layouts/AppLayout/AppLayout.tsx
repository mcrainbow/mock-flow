import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar';

export const AppLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen overflow-hidden">
      <Header />
      <div className="relative grid lg:grid-cols-[auto_1fr] overflow-hidden bg-background">
        <Sidebar />
        <main className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
