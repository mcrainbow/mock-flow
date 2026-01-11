import { PageError } from './PageError';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { customRender } from '@shared/config/tests';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('PageError', () => {
  const mockReload = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    mockReload.mockClear();
  });
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
      configurable: true,
    });
  });
  test('renders correctly', () => {
    const { container } = customRender(<PageError />);
    expect(container).toMatchSnapshot();
  });

  test('reloads page when button is clicked', async () => {
    const { container } = customRender(<PageError />);
    const button = screen.getByRole('button', { name: 'Перезагрузить' });
    await userEvent.click(button);
    expect(window.location.reload).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
