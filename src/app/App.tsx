import { RouterProvider } from '@app/providers';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';

export const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider />
    </ErrorBoundary>
  );
};
