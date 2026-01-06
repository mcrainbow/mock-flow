import { RouterProvider } from '@app/providers';
import { ThemeProvider } from '@shared/context';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';

export const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <RouterProvider />
      </ErrorBoundary>
    </ThemeProvider>
  );
};
