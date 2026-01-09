import { QueryClientProvider } from '@tanstack/react-query';
import { appQueryClient } from '@shared/config';

export function AppQueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={appQueryClient}>{children}</QueryClientProvider>;
}
