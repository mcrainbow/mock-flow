import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '@app/App';
import { AppQueryClientProvider } from './app/providers/AppQueryClientProvider/AppQueryClientProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <AppQueryClientProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </AppQueryClientProvider>
);
