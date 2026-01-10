import { RouterProvider } from '@app/providers';
import { ToastContainer } from 'react-toastify';
import { useInitializeAuth } from '@/entities/user';
import { LoadingFallback } from '@/shared/ui/LoadingFallback/LoadingFallback';

export const App = () => {
  const { isLoading, error } = useInitializeAuth();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {isLoading ? <LoadingFallback /> : <RouterProvider />}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};
