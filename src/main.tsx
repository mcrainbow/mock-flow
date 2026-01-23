import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '@app/App';
import { AppQueryClientProvider } from './app/providers/AppQueryClientProvider/AppQueryClientProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true') {
  // Динамический import — не попадет в production bundle
  const { worker } = await import('@/shared/config/mocks/browser');

  // Запускаем worker
  await worker.start({
    onUnhandledRequest: 'bypass', // Пропускать незамоканные запросы
  });
}

createRoot(document.getElementById('root')!).render(
  <AppQueryClientProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </AppQueryClientProvider>
);
