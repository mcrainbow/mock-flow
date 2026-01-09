import { RouterProvider } from '@app/providers';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';
import { AppQueryClientProvider } from './providers/AppQueryClientProvider/AppQueryClientProvider';

export const App = () => {
  return (
    <AppQueryClientProvider>
      <ErrorBoundary>
        <RouterProvider />
      </ErrorBoundary>
    </AppQueryClientProvider>
  );
};
