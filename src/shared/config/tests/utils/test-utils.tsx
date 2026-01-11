import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Создаем новый QueryClient для каждого теста
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Отключаем повторы в тестах
      },
      mutations: {
        retry: false,
      },
    },
  });

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]; // Для MemoryRouter
  queryClient?: QueryClient; // Если нужен кастомный QueryClient
}

const AllTheProviders = ({
  children,
  initialEntries = ['/'],
  queryClient = createTestQueryClient(),
}: {
  children: React.ReactNode;
  initialEntries?: string[];
  queryClient?: QueryClient;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { initialEntries, queryClient, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialEntries={initialEntries} queryClient={queryClient}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

// Переопределяем render нашим кастомным
export { customRender };
