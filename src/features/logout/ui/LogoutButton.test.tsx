import { LogoutButton } from './LogoutButton';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { customRender } from '@shared/config/tests';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { useLogout } from '../model/hooks/useLogout';

vi.mock('../model/hooks/useLogout', () => ({
  useLogout: vi.fn(),
}));

describe('LogoutButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // ✅ Настройте мок
    vi.mocked(useLogout).mockReturnValue({
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      reset: vi.fn(),
      // ... другие поля из UseMutationResult
    } as any);
  });

  test('renders correctly', () => {
    const { container } = customRender(<LogoutButton />);
    expect(container).toMatchSnapshot();
  });

  test('logs out when button is clicked', async () => {
    const mockMutate = vi.fn();

    vi.mocked(useLogout).mockReturnValue({
      mutate: mockMutate,
    } as any);

    customRender(<LogoutButton />);
    await userEvent.click(screen.getByRole('button'));

    expect(mockMutate).toHaveBeenCalled();
  });
});
