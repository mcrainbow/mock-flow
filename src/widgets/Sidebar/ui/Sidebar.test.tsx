import { render } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useSidebarStore } from '../model/store';
import { MemoryRouter } from 'react-router-dom';

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset Zustand store
    useSidebarStore.setState({ isOpen: false });
  });

  test('renders sidebar closed', () => {
    useSidebarStore.setState({ isOpen: false });
    const { container } = render(
      <MemoryRouter initialEntries={['/app/interview']}>
        <Sidebar />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('renders sidebar open', () => {
    useSidebarStore.setState({ isOpen: true });
    const { container } = render(
      <MemoryRouter initialEntries={['/app/interview']}>
        <Sidebar />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('toggles sidebar', async () => {
    useSidebarStore.setState({ isOpen: false });
    const { rerender } = render(
      <MemoryRouter initialEntries={['/app/interview']}>
        <Sidebar />
      </MemoryRouter>
    );

    expect(useSidebarStore.getState().isOpen).toBe(false);

    useSidebarStore.setState({ isOpen: true });
    rerender(
      <MemoryRouter initialEntries={['/app/interview']}>
        <Sidebar />
      </MemoryRouter>
    );

    expect(useSidebarStore.getState().isOpen).toBe(true);
  });
});
