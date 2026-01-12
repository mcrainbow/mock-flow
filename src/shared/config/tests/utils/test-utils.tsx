import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

// Компонент для отслеживания истории навигации
const LocationTracker = ({ onLocationChange }: { onLocationChange: (location: any) => void }) => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      onLocationChange(location);
    }
    isFirstRender.current = false;
  }, [location, onLocationChange]);

  return null;
};

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  queryClient?: QueryClient;
  withRouter?: boolean; // Если true, рендерим с полным роутером
}

interface CustomRenderResult extends ReturnType<typeof render> {
  navigationHistory: string[]; // История навигации
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions): CustomRenderResult => {
  const {
    initialEntries = ['/'],
    queryClient,
    withRouter = false,
    ...renderOptions
  } = options || {};

  const navigationHistory: string[] = [...initialEntries];

  const handleLocationChange = (location: any) => {
    navigationHistory.push(location.pathname);
  };

  const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient || createTestQueryClient()}>
      <MemoryRouter initialEntries={initialEntries}>
        <LocationTracker onLocationChange={handleLocationChange} />
        {withRouter ? (
          <Routes>
            <Route path="*" element={children} />
          </Routes>
        ) : (
          children
        )}
      </MemoryRouter>
    </QueryClientProvider>
  );

  const result = render(ui, {
    wrapper: AllTheProviders,
    ...renderOptions,
  });

  return {
    ...result,
    navigationHistory,
  };
};

export { customRender };
